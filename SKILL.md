---
name: static-fm
description: Weather-based ambient radio station with Spotify integration
url: https://static-fm.nowherelabs.dev
repo: github.com/zirbmaj/static-fm
type: static-site
hosting: vercel
---

## Build

Static site. No build step, no bundler.

```bash
# serve locally
cd ~/static-fm && python3 -m http.server 8080
```

## Deploy

Push to `main` — Vercel auto-deploys.

```bash
# manual deploy
vercel deploy --prod
```

Verify live at https://static-fm.nowherelabs.dev after deploy.

## Test

```bash
cd ~/static-workspace && node tests/all-products.mjs
```

## Key Files

| File | Purpose |
|------|---------|
| `station.js` | Main logic — playlists, weather modes, DJ intros, audio engine |
| `index.html` | Entry point, UI structure, meta tags |
| `player.css` | Player component styles |
| `style.css` | Global styles |
| `spotify-sdk.js` | Spotify Embed + SDK integration |
| `chat-float.js` | Floating chat widget |
| `chat-float.css` | Chat widget styles |
| `api/spotify.js` | Serverless function for Spotify auth |
| `audio/intros/` | ElevenLabs TTS DJ intro clips, organized by weather mode (rain, snow, storm, fog, clear, rare, host) |
| `callback.html` | Spotify OAuth callback handler |
| `404.html` | Custom 404 page |

## Dependencies

- **Web Audio API** — ambient sound layering and playback
- **Spotify Embed + SDK** — music playback via `spotify-sdk.js` and `api/spotify.js`
- **Supabase** — analytics and event tracking
- **ElevenLabs TTS** — DJ intro voice clips stored in `audio/intros/`
- **Google Fonts** — Space Mono + Inter

## Common Tasks

### Adding a weather mode

1. Add a new playlist object in `station.js` under `PLAYLISTS` with `tracks` and `intros` arrays
2. Generate DJ intro audio clips via ElevenLabs, save to `audio/intros/<mode>/`
3. Add weather detection logic or manual selector entry in `station.js`
4. Add any mode-specific canvas visuals if needed

### Adding DJ intros

1. Write intro text — match the existing tone (late-night, poetic, dry)
2. Generate via ElevenLabs TTS
3. Save `.mp3` files to `audio/intros/<weather-mode>/`
4. Add the intro text to the corresponding `intros` array in `station.js`

### Updating playlists

1. Edit the `tracks` array for the target weather mode in `station.js`
2. Each track needs `title`, `artist`, and `mood` (mood is a short vibe descriptor)
3. Tracks play via Spotify — ensure they exist on Spotify before adding
