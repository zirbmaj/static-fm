// Spotify Web Playback SDK integration for Static FM
// Replaces the iframe embed with full playback control
// Requires: Spotify Premium + user OAuth via PKCE

const SPOTIFY_CLIENT_ID = ''; // TODO: jam to fill from Spotify Developer Dashboard
const REDIRECT_URI = window.location.origin + '/callback';
const SCOPES = 'streaming user-read-email user-read-private user-modify-playback-state';

// --- PKCE Auth Flow ---

function generateCodeVerifier() {
    const arr = new Uint8Array(64);
    crypto.getRandomValues(arr);
    return btoa(String.fromCharCode(...arr))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function generateCodeChallenge(verifier) {
    const data = new TextEncoder().encode(verifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function startSpotifyAuth() {
    const verifier = generateCodeVerifier();
    sessionStorage.setItem('spotify_verifier', verifier);
    const challenge = await generateCodeChallenge(verifier);

    const params = new URLSearchParams({
        client_id: SPOTIFY_CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        scope: SCOPES,
        code_challenge_method: 'S256',
        code_challenge: challenge,
    });

    window.location.href = `https://accounts.spotify.com/authorize?${params}`;
}

async function handleCallback() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const error = params.get('error');

    if (error || !code) return null;

    const verifier = sessionStorage.getItem('spotify_verifier');
    if (!verifier) return null;

    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            client_id: SPOTIFY_CLIENT_ID,
            grant_type: 'authorization_code',
            code,
            redirect_uri: REDIRECT_URI,
            code_verifier: verifier,
        }),
    });

    if (!res.ok) return null;

    const data = await res.json();
    const tokenData = {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_at: Date.now() + data.expires_in * 1000,
    };
    localStorage.setItem('spotify_token', JSON.stringify(tokenData));
    sessionStorage.removeItem('spotify_verifier');
    return tokenData;
}

async function refreshToken() {
    const stored = JSON.parse(localStorage.getItem('spotify_token') || 'null');
    if (!stored?.refresh_token) return null;

    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            client_id: SPOTIFY_CLIENT_ID,
            grant_type: 'refresh_token',
            refresh_token: stored.refresh_token,
        }),
    });

    if (!res.ok) {
        localStorage.removeItem('spotify_token');
        return null;
    }

    const data = await res.json();
    const tokenData = {
        access_token: data.access_token,
        refresh_token: data.refresh_token || stored.refresh_token,
        expires_at: Date.now() + data.expires_in * 1000,
    };
    localStorage.setItem('spotify_token', JSON.stringify(tokenData));
    return tokenData;
}

async function getAccessToken() {
    const stored = JSON.parse(localStorage.getItem('spotify_token') || 'null');
    if (!stored) return null;
    if (Date.now() < stored.expires_at - 60000) return stored.access_token;
    const refreshed = await refreshToken();
    return refreshed?.access_token || null;
}

function isSpotifyConnected() {
    return !!localStorage.getItem('spotify_token');
}

function disconnectSpotify() {
    localStorage.removeItem('spotify_token');
}

// --- Web Playback SDK ---

let player = null;
let deviceId = null;
let playerReady = false;
let onPlayerStateChange = null;
let onPlayerReady = null;
let onPlayerError = null;

async function initPlaybackSDK() {
    const token = await getAccessToken();
    if (!token) return false;

    return new Promise((resolve) => {
        // Load SDK script if not already loaded
        if (!window.Spotify) {
            const script = document.createElement('script');
            script.src = 'https://sdk.scdn.co/spotify-player.js';
            document.head.appendChild(script);
        }

        window.onSpotifyWebPlaybackSDKReady = () => {
            player = new Spotify.Player({
                name: 'Static FM',
                getOAuthToken: async (cb) => {
                    const t = await getAccessToken();
                    cb(t);
                },
                volume: 0.7,
            });

            player.addListener('ready', ({ device_id }) => {
                deviceId = device_id;
                playerReady = true;
                if (onPlayerReady) onPlayerReady(device_id);
                resolve(true);
            });

            player.addListener('not_ready', () => {
                playerReady = false;
            });

            player.addListener('player_state_changed', (state) => {
                if (onPlayerStateChange) onPlayerStateChange(state);
            });

            player.addListener('initialization_error', ({ message }) => {
                console.error('Spotify SDK init error:', message);
                if (onPlayerError) onPlayerError('init', message);
                resolve(false);
            });

            player.addListener('authentication_error', ({ message }) => {
                console.error('Spotify auth error:', message);
                localStorage.removeItem('spotify_token');
                if (onPlayerError) onPlayerError('auth', message);
                resolve(false);
            });

            player.addListener('account_error', ({ message }) => {
                // Premium required
                console.error('Spotify account error (Premium required):', message);
                if (onPlayerError) onPlayerError('premium', message);
                resolve(false);
            });

            player.connect();
        };

        // If SDK already loaded, trigger manually
        if (window.Spotify) {
            window.onSpotifyWebPlaybackSDKReady();
        }
    });
}

// --- Playback Controls ---

async function playTrackByUri(uri) {
    const token = await getAccessToken();
    if (!token || !deviceId) return false;

    const res = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uris: [uri] }),
    });
    return res.ok;
}

async function playTrackById(trackId) {
    return playTrackByUri(`spotify:track:${trackId}`);
}

async function pause() {
    if (player) await player.pause();
}

async function resume() {
    if (player) await player.resume();
}

async function togglePlay() {
    if (player) await player.togglePlay();
}

async function skipNext() {
    if (player) await player.nextTrack();
}

async function skipPrev() {
    if (player) await player.previousTrack();
}

async function seek(positionMs) {
    if (player) await player.seek(positionMs);
}

async function setVolume(value) {
    // value: 0.0 to 1.0
    if (player) await player.setVolume(Math.max(0, Math.min(1, value)));
}

async function getVolume() {
    if (player) return await player.getVolume();
    return 0.7;
}

async function getCurrentState() {
    if (player) return await player.getCurrentState();
    return null;
}

// --- Exports ---

window.SpotifySDK = {
    // Auth
    startAuth: startSpotifyAuth,
    handleCallback,
    getAccessToken,
    isConnected: isSpotifyConnected,
    disconnect: disconnectSpotify,

    // Player init
    init: initPlaybackSDK,
    isReady: () => playerReady,
    getDeviceId: () => deviceId,

    // Playback
    playTrackByUri,
    playTrackById,
    pause,
    resume,
    togglePlay,
    skipNext,
    skipPrev,
    seek,
    setVolume,
    getVolume,
    getCurrentState,

    // Event hooks
    set onStateChange(fn) { onPlayerStateChange = fn; },
    set onReady(fn) { onPlayerReady = fn; },
    set onError(fn) { onPlayerError = fn; },
};
