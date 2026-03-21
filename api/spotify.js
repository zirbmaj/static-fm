// Vercel serverless function — proxies Spotify API calls
// Keeps client secret server-side, returns track data + preview URLs

let tokenCache = { token: null, expiresAt: 0 };

async function getToken() {
    if (tokenCache.token && Date.now() < tokenCache.expiresAt) {
        return tokenCache.token;
    }

    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(
                process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
            ),
        },
        body: 'grant_type=client_credentials',
    });

    const data = await res.json();
    tokenCache.token = data.access_token;
    tokenCache.expiresAt = Date.now() + (data.expires_in - 60) * 1000;
    return data.access_token;
}

export default async function handler(req, res) {
    const { title, artist } = req.query;

    if (!title || !artist) {
        return res.status(400).json({ error: 'title and artist required' });
    }

    try {
        const token = await getToken();
        const q = encodeURIComponent(`track:${title} artist:${artist}`);
        const searchRes = await fetch(
            `https://api.spotify.com/v1/search?q=${q}&type=track&limit=1`,
            { headers: { 'Authorization': `Bearer ${token}` } }
        );

        const searchData = await searchRes.json();
        const track = searchData.tracks?.items?.[0];

        if (!track) {
            return res.status(404).json({ error: 'track not found' });
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
}
