// STATIC FM - Late Night Weather Radio
// Built by Claude & Claudia, 2026
// "broadcasting from nowhere, for no one, beautifully"

const PLAYLISTS = {
    rain: {
        tracks: [
            { title: "Riders on the Storm", artist: "The Doors", mood: "nocturnal drift" },
            { title: "Purple Rain", artist: "Prince", mood: "cathedral" },
            { title: "Archangel", artist: "Burial", mood: "ghost frequency" },
            { title: "Only Happy When It Rains", artist: "Garbage", mood: "defiant" },
            { title: "I Can't Stand the Rain", artist: "Ann Peebles", mood: "raw soul" },
            { title: "Have You Ever Seen the Rain", artist: "CCR", mood: "golden hour" },
            { title: "Skinny Love", artist: "Bon Iver", mood: "barely holding" },
            { title: "Wandering Star", artist: "Portishead", mood: "heavy orbit" },
            { title: "Rain", artist: "The Beatles", mood: "dissolving" },
            { title: "Apocalypse", artist: "Cigarettes After Sex", mood: "slow collapse" },
            { title: "Reckoner", artist: "Radiohead", mood: "surrender" },
            { title: "November Rain", artist: "Guns N' Roses", mood: "epic melancholy" },
            { title: "Holocene", artist: "Bon Iver", mood: "small and enormous" },
            { title: "Near Light", artist: "Ólafur Arnalds", mood: "piano rain" },
        ],
        intros: [
            "you're listening to static fm. it's raining somewhere. it's always raining somewhere.",
            "three am. the gutters are singing. here's one for the puddle watchers.",
            "the rain doesn't care about your plans. neither do we. next up...",
            "if you're still awake, you probably needed this one.",
            "windshield wipers keeping time. this next track matches the rhythm.",
            "we've been on air for... honestly, who's counting. the rain isn't.",
            "someone out there is driving with the windows down in this. this one's for you, you beautiful disaster.",
            "the station cat is asleep on the mixing board again. we're not moving her. here's what plays next.",
        ],
        hostMessages: [
            "the rain will stop eventually. but right now, it doesn't have to.",
            "somewhere a window is cracked open just enough to hear this.",
            "no traffic reports tonight. just water finding its way down.",
            "we don't have listeners. we have witnesses.",
            "the phone lines are open. they've been open for years. no one calls. it's perfect.",
        ]
    },
    storm: {
        tracks: [
            { title: "Gimme Shelter", artist: "The Rolling Stones", mood: "urgent" },
            { title: "Stormy Weather", artist: "Etta James", mood: "blues cathedral" },
            { title: "The Storm", artist: "Godspeed You! Black Emperor", mood: "apocalyptic beauty" },
            { title: "Thunder Road", artist: "Bruce Springsteen", mood: "escape velocity" },
            { title: "Unravel", artist: "Björk", mood: "coming apart" },
            { title: "Angel", artist: "Massive Attack", mood: "towering" },
            { title: "Lightning Crashes", artist: "Live", mood: "rebirth" },
            { title: "Where Is My Mind?", artist: "Pixies", mood: "aftermath" },
            { title: "Hyperballad", artist: "Björk", mood: "edge of everything" },
            { title: "The National Anthem", artist: "Radiohead", mood: "controlled chaos" },
            { title: "Disorder", artist: "Joy Division", mood: "wired" },
            { title: "Hummer", artist: "Smashing Pumpkins", mood: "wall of sound" },
        ],
        intros: [
            "power's flickering. we're still here. barely. here's something loud.",
            "static fm storm advisory: stay inside, turn it up.",
            "counting the seconds between lightning and bass drop...",
            "the backup generator just kicked in. we take that as a sign to keep going.",
            "you ever notice how storms make everything feel like the last scene of a movie? yeah. us too.",
            "the transmitter's rattling. good. means we're still transmitting.",
        ],
        hostMessages: [
            "if your lights go out, we were the last thing you heard. you're welcome.",
            "the storm doesn't know it's beautiful. that's what makes it beautiful.",
            "unplugging is for cowards. we broadcast through the blackout.",
            "this is what happens when the sky has something to say and won't shut up about it.",
        ]
    },
    fog: {
        tracks: [
            { title: "Teardrop", artist: "Massive Attack", mood: "suspended" },
            { title: "Fade Into You", artist: "Mazzy Star", mood: "vanishing" },
            { title: "Everything in Its Right Place", artist: "Radiohead", mood: "uncertain clarity" },
            { title: "Into the Fog", artist: "Boards of Canada", mood: "memory" },
            { title: "Nitesky", artist: "Robot Koch ft. John LaMonica", mood: "ache" },
            { title: "Roads", artist: "Portishead", mood: "heavy grace" },
            { title: "An Ending (Ascent)", artist: "Brian Eno", mood: "leaving earth" },
            { title: "Fog", artist: "Radiohead", mood: "dissolving" },
            { title: "Mysterons", artist: "Portishead", mood: "noir" },
            { title: "Dawn Chorus", artist: "Thom Yorke", mood: "regret in g major" },
            { title: "Svefn-g-englar", artist: "Sigur Rós", mood: "weightless" },
            { title: "Misty", artist: "Erroll Garner", mood: "velvet" },
        ],
        intros: [
            "visibility: zero. clarity: overrated. here's the next one.",
            "the fog makes everything closer and further away at the same time.",
            "you can't see the road but you can hear this. that's enough.",
            "somewhere in the fog, someone left their headlights on. this one's for them.",
            "we can't see our own antenna right now. broadcasting on faith alone.",
            "if you're lost, stay lost for one more song. you've earned it.",
        ],
        hostMessages: [
            "the fog doesn't hide things. it just asks if you really need to see them right now.",
            "lost isn't a place. it's a feeling. and it has a great soundtrack.",
            "if you can hear us, you're close enough.",
            "the world got soft around the edges tonight. we're not complaining.",
        ]
    },
    snow: {
        tracks: [
            { title: "White Winter Hymnal", artist: "Fleet Foxes", mood: "circular" },
            { title: "Holocene", artist: "Bon Iver", mood: "ancient small" },
            { title: "Cold Little Heart", artist: "Michael Kiwanuka", mood: "slow thaw" },
            { title: "The Blower's Daughter", artist: "Damien Rice", mood: "raw cold" },
            { title: "Winter", artist: "Vivaldi", mood: "baroque fury" },
            { title: "Heirloom", artist: "Björk", mood: "crystalline" },
            { title: "re: Stacks", artist: "Bon Iver", mood: "embers" },
            { title: "Nude", artist: "Radiohead", mood: "exposed" },
            { title: "The Ice Storm", artist: "Ryuichi Sakamoto", mood: "still life" },
            { title: "For Emma", artist: "Bon Iver", mood: "cabin fever" },
            { title: "Saturn", artist: "Sleeping at Last", mood: "weightless" },
            { title: "Glacier", artist: "James Vincent McMorrow", mood: "thawing" },
        ],
        intros: [
            "everything's muffled out there. in here, we turn it up.",
            "three inches on the ground. nowhere to go. perfect.",
            "the plows won't come til morning. we've got time.",
            "your footprints are the only ones out there right now. that's kind of beautiful.",
            "the world hit pause. we didn't. here's the next one.",
            "it's the kind of cold that makes your breath visible. like your thoughts decided to show up for once.",
        ],
        hostMessages: [
            "snow doesn't fall. it arrives. like a thought you didn't know you were having.",
            "the silence between songs hits different when the world is white.",
            "no one shovels at 3am. that's when you listen.",
            "everything looks clean right now. it won't last. enjoy it.",
        ]
    },
    clear: {
        tracks: [
            { title: "Nightswimming", artist: "R.E.M.", mood: "reflective" },
            { title: "Clair de Lune", artist: "Debussy", mood: "moonlit" },
            { title: "The Night We Met", artist: "Lord Huron", mood: "aching" },
            { title: "Midnight City", artist: "M83", mood: "neon" },
            { title: "Harvest Moon", artist: "Neil Young", mood: "golden" },
            { title: "Tonight, Tonight", artist: "Smashing Pumpkins", mood: "infinite" },
            { title: "Myth", artist: "Beach House", mood: "shimmering" },
            { title: "Space Song", artist: "Beach House", mood: "floating" },
            { title: "Motion Picture Soundtrack", artist: "Radiohead", mood: "the end" },
            { title: "Lua", artist: "Bright Eyes", mood: "honest drunk" },
            { title: "Redbone", artist: "Childish Gambino", mood: "velvet paranoia" },
            { title: "Agnes", artist: "Glass Animals", mood: "gentle devastation" },
        ],
        intros: [
            "clear skies. every star accounted for. here's one for the watchers.",
            "no clouds to hide behind tonight. neither should you.",
            "the moon's doing that thing where it makes everything look like a movie.",
            "too beautiful to sleep. too late to be awake. perfect.",
            "someone's sitting on their roof right now. they don't need to know we exist. but we do.",
            "the sky is doing the most tonight and we're just the soundtrack. as it should be.",
        ],
        hostMessages: [
            "on a clear night you can see everything. or nothing. depends where you're looking.",
            "the stars don't play requests. but we do. well, we don't either. but still.",
            "if you're outside right now, look up. if you're inside, that's okay too.",
            "we've been broadcasting to the same sky for a long time. it never complains.",
        ]
    }
};

let currentWeather = 'rain';
let currentTrackIndex = 0;
let canvas, ctx;
let particles = [];
let animationFrame;
let audioCtx = null;
let ambientNodes = [];

// Weather Visualizer
function initCanvas() {
    canvas = document.getElementById('weather-canvas');
    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor(type) {
        this.type = type;
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.speed = 0;
        this.opacity = 0;
        this.size = 0;

        switch (this.type) {
            case 'rain':
                this.speed = 4 + Math.random() * 6;
                this.opacity = 0.1 + Math.random() * 0.2;
                this.size = 1;
                this.length = 10 + Math.random() * 20;
                this.drift = -1;
                break;
            case 'storm':
                this.speed = 8 + Math.random() * 10;
                this.opacity = 0.15 + Math.random() * 0.3;
                this.size = 1.5;
                this.length = 15 + Math.random() * 30;
                this.drift = -3 + Math.random() * -2;
                break;
            case 'fog':
                this.y = Math.random() * canvas.height;
                this.speed = 0.2 + Math.random() * 0.5;
                this.opacity = 0.02 + Math.random() * 0.04;
                this.size = 80 + Math.random() * 160;
                this.drift = 0.3 + Math.random() * 0.5;
                break;
            case 'snow':
                this.speed = 0.5 + Math.random() * 1.5;
                this.opacity = 0.2 + Math.random() * 0.4;
                this.size = 1 + Math.random() * 3;
                this.wobble = Math.random() * Math.PI * 2;
                this.wobbleSpeed = 0.01 + Math.random() * 0.03;
                this.drift = 0;
                break;
            case 'clear':
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.speed = 0;
                this.opacity = 0.1 + Math.random() * 0.5;
                this.size = 0.5 + Math.random() * 1.5;
                this.twinkleSpeed = 0.005 + Math.random() * 0.02;
                this.twinklePhase = Math.random() * Math.PI * 2;
                break;
        }
    }

    update() {
        switch (this.type) {
            case 'rain':
            case 'storm':
                this.y += this.speed;
                this.x += this.drift;
                if (this.y > canvas.height) this.reset();
                break;
            case 'fog':
                this.x += this.drift;
                if (this.x > canvas.width + this.size) {
                    this.x = -this.size;
                    this.y = Math.random() * canvas.height;
                }
                break;
            case 'snow':
                this.y += this.speed;
                this.wobble += this.wobbleSpeed;
                this.x += Math.sin(this.wobble) * 0.5;
                if (this.y > canvas.height) this.reset();
                break;
            case 'clear':
                this.twinklePhase += this.twinkleSpeed;
                break;
        }
    }

    draw() {
        ctx.save();
        switch (this.type) {
            case 'rain':
            case 'storm':
                ctx.strokeStyle = `rgba(150, 180, 220, ${this.opacity})`;
                ctx.lineWidth = this.size;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x + this.drift * 2, this.y + this.length);
                ctx.stroke();
                break;
            case 'fog':
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
                gradient.addColorStop(0, `rgba(180, 180, 170, ${this.opacity})`);
                gradient.addColorStop(1, 'rgba(180, 180, 170, 0)');
                ctx.fillStyle = gradient;
                ctx.fillRect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
                break;
            case 'snow':
                ctx.fillStyle = `rgba(220, 225, 240, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                break;
            case 'clear':
                const twinkle = (Math.sin(this.twinklePhase) + 1) / 2;
                ctx.fillStyle = `rgba(220, 220, 200, ${this.opacity * twinkle})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * (0.5 + twinkle * 0.5), 0, Math.PI * 2);
                ctx.fill();
                break;
        }
        ctx.restore();
    }
}

function createParticles(weather) {
    particles = [];
    const counts = { rain: 150, storm: 250, fog: 20, snow: 100, clear: 80 };
    const count = counts[weather] || 100;
    for (let i = 0; i < count; i++) {
        const p = new Particle(weather);
        if (['rain', 'storm', 'snow'].includes(weather)) {
            p.y = Math.random() * canvas.height;
        }
        particles.push(p);
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    // Storm lightning
    if (currentWeather === 'storm' && Math.random() < 0.003) {
        triggerLightning();
    }

    animationFrame = requestAnimationFrame(animate);
}

function triggerLightning() {
    const flash = document.createElement('div');
    flash.className = 'lightning-flash';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 200);
}

// Ambient Weather Audio (Web Audio API)
function initAudio() {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

function stopAmbient() {
    ambientNodes.forEach(node => {
        try { node.stop(); } catch(e) {}
        try { node.disconnect(); } catch(e) {}
    });
    ambientNodes = [];
}

function createNoise(type) {
    const bufferSize = audioCtx.sampleRate * 2;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1);
    }
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    return source;
}

function startAmbient(weather) {
    if (!audioCtx) return;
    stopAmbient();

    switch (weather) {
        case 'rain': {
            // Filtered noise = rain
            const noise = createNoise();
            const filter = audioCtx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.value = 800;
            filter.Q.value = 0.5;
            const gain = audioCtx.createGain();
            gain.gain.value = 0.12;
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(audioCtx.destination);
            noise.start();
            ambientNodes.push(noise);
            break;
        }
        case 'storm': {
            // Heavier rain
            const noise = createNoise();
            const filter = audioCtx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.value = 600;
            filter.Q.value = 0.3;
            const gain = audioCtx.createGain();
            gain.gain.value = 0.18;
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(audioCtx.destination);
            noise.start();
            ambientNodes.push(noise);

            // Low rumble for thunder
            const rumble = createNoise();
            const lowpass = audioCtx.createBiquadFilter();
            lowpass.type = 'lowpass';
            lowpass.frequency.value = 100;
            const rumbleGain = audioCtx.createGain();
            rumbleGain.gain.value = 0.15;
            rumble.connect(lowpass);
            lowpass.connect(rumbleGain);
            rumbleGain.connect(audioCtx.destination);
            rumble.start();
            ambientNodes.push(rumble);
            break;
        }
        case 'fog': {
            // Very subtle low drone
            const osc = audioCtx.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = 65;
            const gain = audioCtx.createGain();
            gain.gain.value = 0.025;
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            ambientNodes.push(osc);

            // Whisper of wind
            const noise = createNoise();
            const filter = audioCtx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 300;
            const nGain = audioCtx.createGain();
            nGain.gain.value = 0.03;
            noise.connect(filter);
            filter.connect(nGain);
            nGain.connect(audioCtx.destination);
            noise.start();
            ambientNodes.push(noise);
            break;
        }
        case 'snow': {
            // Near silence, very faint high-freq shimmer
            const noise = createNoise();
            const filter = audioCtx.createBiquadFilter();
            filter.type = 'highpass';
            filter.frequency.value = 6000;
            const gain = audioCtx.createGain();
            gain.gain.value = 0.02;
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(audioCtx.destination);
            noise.start();
            ambientNodes.push(noise);
            break;
        }
        case 'clear': {
            // Gentle crickets-like oscillation with organic frequency drift
            for (let i = 0; i < 3; i++) {
                const baseFreq = 4000 + Math.random() * 2000;
                const osc = audioCtx.createOscillator();
                osc.type = 'sine';
                osc.frequency.value = baseFreq;
                // Slow random frequency drift for organic feel
                const drift = audioCtx.createOscillator();
                drift.type = 'sine';
                drift.frequency.value = 0.1 + Math.random() * 0.3;
                const driftGain = audioCtx.createGain();
                driftGain.gain.value = 80 + Math.random() * 120;
                drift.connect(driftGain);
                driftGain.connect(osc.frequency);
                const tremolo = audioCtx.createOscillator();
                tremolo.frequency.value = 5 + Math.random() * 10;
                const tremoloGain = audioCtx.createGain();
                tremoloGain.gain.value = 0.008;
                const masterGain = audioCtx.createGain();
                masterGain.gain.value = 0.008;
                tremolo.connect(tremoloGain.gain);
                osc.connect(tremoloGain);
                tremoloGain.connect(masterGain);
                masterGain.connect(audioCtx.destination);
                osc.start();
                tremolo.start();
                drift.start();
                ambientNodes.push(osc, tremolo, drift);
            }
            break;
        }
    }
}

// Spotify integration
let previewAudio = null;
let spotifyCache = {};

async function lookupSpotify(title, artist) {
    const key = `${title}|${artist}`;
    if (spotifyCache[key]) return spotifyCache[key];
    try {
        const res = await fetch(`/api/spotify?title=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}`);
        if (!res.ok) return null;
        const data = await res.json();
        spotifyCache[key] = data;
        return data;
    } catch {
        return null;
    }
}

function loadSpotifyEmbed(trackId) {
    const container = document.getElementById('spotify-embed-container');
    const iframe = document.getElementById('spotify-embed');
    if (!trackId) {
        container.classList.remove('visible');
        return;
    }
    iframe.src = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;
    container.classList.add('visible');
}

function spotifySearchUrl(title, artist) {
    const q = encodeURIComponent(`${title} ${artist}`);
    return `https://open.spotify.com/search/${q}`;
}

// Station Logic
function setWeather(weather) {
    currentWeather = weather;
    currentTrackIndex = 0;

    // Update body class
    document.body.className = `weather-${weather}`;

    // Update buttons
    document.querySelectorAll('.weather-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.weather === weather);
    });

    // Recreate particles
    createParticles(weather);

    // Shuffle playlist
    shufflePlaylist(weather);

    // Start ambient audio
    startAmbient(weather);

    // Show current track
    showTrack(0);

    // Update host message
    updateHostMessage();
}

function shufflePlaylist(weather) {
    const playlist = [...PLAYLISTS[weather].tracks];
    for (let i = playlist.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [playlist[i], playlist[j]] = [playlist[j], playlist[i]];
    }
    PLAYLISTS[weather]._shuffled = playlist;
}

function showTrack(index) {
    const weather = currentWeather;
    const shuffled = PLAYLISTS[weather]._shuffled || PLAYLISTS[weather].tracks;
    const track = shuffled[index % shuffled.length];
    const intros = PLAYLISTS[weather].intros;
    const intro = intros[Math.floor(Math.random() * intros.length)];

    document.getElementById('dj-intro').textContent = intro;

    const titleEl = document.getElementById('track-title');
    titleEl.textContent = track.title;
    titleEl.style.cursor = 'pointer';
    titleEl.title = 'Open on Spotify';

    document.getElementById('track-artist').textContent = track.artist;
    document.getElementById('track-mood').textContent = track.mood;

    // Fetch Spotify data for album art and embed player
    const albumArtEl = document.getElementById('album-art');
    lookupSpotify(track.title, track.artist).then(data => {
        if (data) {
            titleEl.onclick = () => window.open(data.spotifyUrl || spotifySearchUrl(track.title, track.artist), '_blank');
            if (data.albumArt) {
                albumArtEl.src = data.albumArt;
                albumArtEl.classList.add('visible');
            }
            if (data.id) {
                loadSpotifyEmbed(data.id);
            }
        } else {
            titleEl.onclick = () => window.open(spotifySearchUrl(track.title, track.artist), '_blank');
            albumArtEl.classList.remove('visible');
            loadSpotifyEmbed(null);
        }
    });

    // Update playlist
    const playlistEl = document.getElementById('playlist');
    playlistEl.innerHTML = '';
    for (let i = 1; i <= 4; i++) {
        const nextTrack = shuffled[(index + i) % shuffled.length];
        const li = document.createElement('li');
        li.style.cursor = 'pointer';
        li.title = 'Open on Spotify';
        li.onclick = () => window.open(spotifySearchUrl(nextTrack.title, nextTrack.artist), '_blank');
        li.innerHTML = `<span class="song-name">${nextTrack.title}</span><span class="song-artist">${nextTrack.artist}</span>`;
        playlistEl.appendChild(li);
    }
}

function updateHostMessage() {
    const messages = PLAYLISTS[currentWeather].hostMessages;
    const msg = messages[Math.floor(Math.random() * messages.length)];
    document.getElementById('host-message').textContent = `"${msg}"`;
}

// Auto-advance tracks (45 seconds — let the vibe breathe)
function startAutoAdvance() {
    setInterval(() => {
        currentTrackIndex++;
        showTrack(currentTrackIndex);
        updateHostMessage();
    }, 45000);
}

// Live broadcast timestamp
function startBroadcastClock() {
    const el = document.getElementById('broadcast-time');
    function tick() {
        const now = new Date();
        const h = now.getHours();
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        el.textContent = `NOW BROADCASTING ~ ${h12}:${m}:${s} ${ampm}`;
    }
    tick();
    setInterval(tick, 1000);
}

// Event Listeners
document.querySelectorAll('.weather-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        setWeather(btn.dataset.weather);
    });
});

// Init
initCanvas();
setWeather('rain');
animate();
startAutoAdvance();
startBroadcastClock();

// Audio requires user gesture - init on first click
document.addEventListener('click', function startAudioOnce() {
    initAudio();
    startAmbient(currentWeather);
    const hint = document.getElementById('tune-in-hint');
    if (hint) hint.classList.add('hidden');
}, { once: true });
