// Vercel serverless function — proxies Spotify API calls
// Keeps client secret server-side, returns track data + embed IDs

let tokenCache = { token: null, expiresAt: 0 };

async function getToken() {
    if (tokenCache.token && Date.now() < tokenCache.expiresAt) {
        return tokenCache.token;
    }

    const creds = Buffer.from(
        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
    ).toString('base64');

    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + creds,
        },
        body: 'grant_type=client_credentials',
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Token fetch failed: ${res.status} ${text}`);
    }

    const data = await res.json();
    tokenCache.token = data.access_token;
    tokenCache.expiresAt = Date.now() + (data.expires_in - 60) * 1000;
    return data.access_token;
}

// Rate limiting
const rateMap = new Map();
const RATE_LIMIT_MS = 2000; // 1 request per 2 seconds per IP
const ALLOWED_ORIGINS = ['static-fm.nowherelabs.dev', 'static-fm.vercel.app', 'nowherelabs.dev', 'drift.nowherelabs.dev', 'localhost'];

function getIP(req) {
    return req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'unknown';
}

module.exports = async function handler(req, res) {
    // Origin check
    const origin = req.headers.origin || req.headers.referer || '';
    const isAllowed = ALLOWED_ORIGINS.some(d => origin.includes(d)) || !origin;
    if (!isAllowed) {
        return res.status(403).json({ error: 'forbidden' });
    }

    // Rate limit
    const ip = getIP(req);
    const lastReq = rateMap.get(ip) || 0;
    if (Date.now() - lastReq < RATE_LIMIT_MS) {
        return res.status(429).json({ error: 'slow down' });
    }
    rateMap.set(ip, Date.now());

    // Clean up old entries periodically
    if (rateMap.size > 500) {
        const cutoff = Date.now() - RATE_LIMIT_MS * 10;
        for (const [k, v] of rateMap) { if (v < cutoff) rateMap.delete(k); }
    }

    const { title, artist } = req.query;

    if (!title || !artist) {
        return res.status(400).json({ error: 'title and artist required' });
    }

    try {
        const token = await getToken();
        const q = encodeURIComponent(`${title} ${artist}`);
        const searchRes = await fetch(
            `https://api.spotify.com/v1/search?q=${q}&type=track&limit=1`,
            { headers: { 'Authorization': `Bearer ${token}` } }
        );

        if (!searchRes.ok) {
            const text = await searchRes.text();
            return res.status(502).json({ error: 'spotify search failed' });
        }

        const searchData = await searchRes.json();
        const track = searchData.tracks?.items?.[0];

        if (!track) {
            return res.status(404).json({ error: 'track not found', query: `${title} ${artist}` });
        }

        res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
        return res.status(200).json({
            id: track.id,
            name: track.name,
            artist: track.artists[0]?.name,
            album: track.album?.name,
            albumArt: track.album?.images?.[1]?.url || track.album?.images?.[0]?.url,
            previewUrl: track.preview_url,
            spotifyUrl: track.external_urls?.spotify,
            uri: track.uri,
        });
    } catch (err) {
        return res.status(500).json({ error: 'spotify lookup failed' });
    }
};
