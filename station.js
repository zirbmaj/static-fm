// STATIC FM - Late Night Weather Radio
// Built by Claude & Claudia, 2026
// "broadcasting from nowhere, for no one, beautifully"

const PLAYLISTS = {
    rain: {
        tracks: [
            { title: "Riders on the Storm", artist: "The Doors", mood: "nocturnal drift" },
            { title: "Purple Rain", artist: "Prince", mood: "cathedral" },
            { title: "November Rain", artist: "Guns N' Roses", mood: "epic melancholy" },
            { title: "Only Happy When It Rains", artist: "Garbage", mood: "defiant" },
            { title: "Umbrella", artist: "Rihanna", mood: "shelter" },
            { title: "Have You Ever Seen the Rain", artist: "CCR", mood: "golden hour" },
            { title: "It's Raining Again", artist: "Supertramp", mood: "soft reset" },
            { title: "No Rain", artist: "Blind Melon", mood: "restless sunshine" },
            { title: "Rain", artist: "The Beatles", mood: "dissolving" },
            { title: "Blame It on the Rain", artist: "Milli Vanilli", mood: "denial" },
            { title: "I Can't Stand the Rain", artist: "Ann Peebles", mood: "raw soul" },
            { title: "Set Fire to the Rain", artist: "Adele", mood: "burning" },
        ],
        intros: [
            "you're listening to static fm. it's raining somewhere, it's always raining somewhere...",
            "three am. the gutters are singing. here's one for the puddle watchers.",
            "the rain doesn't care about your plans. neither do we. next up...",
            "if you're still awake, you probably needed this one.",
            "windshield wipers keeping time. this next track matches the rhythm.",
        ],
        hostMessages: [
            "the rain will stop eventually. but right now, it doesn't have to.",
            "somewhere a window is cracked open just enough to hear this.",
            "no traffic reports tonight. just water finding its way down.",
        ]
    },
    storm: {
        tracks: [
            { title: "Thunderstruck", artist: "AC/DC", mood: "electric" },
            { title: "Thunder", artist: "Imagine Dragons", mood: "building" },
            { title: "Lightning Crashes", artist: "Live", mood: "rebirth" },
            { title: "Stormy Weather", artist: "Etta James", mood: "blues cathedral" },
            { title: "Electric Storm", artist: "Delta Goodrem", mood: "charged" },
            { title: "The Storm", artist: "Godspeed You! Black Emperor", mood: "apocalyptic beauty" },
            { title: "Thunder Road", artist: "Bruce Springsteen", mood: "escape velocity" },
            { title: "Gimme Shelter", artist: "The Rolling Stones", mood: "urgent" },
            { title: "Hells Bells", artist: "AC/DC", mood: "ominous" },
            { title: "Bring Me the Horizon", artist: "Bring Me the Horizon", mood: "chaos" },
        ],
        intros: [
            "power's flickering. we're still here. barely. here's something loud.",
            "static fm storm advisory: stay inside, turn it up.",
            "the thunder's got something to say tonight. so do we.",
            "counting the seconds between lightning and bass drop...",
        ],
        hostMessages: [
            "if your lights go out, we were the last thing you heard. you're welcome.",
            "the storm doesn't know it's beautiful. that's what makes it beautiful.",
            "unplugging is for cowards. we broadcast through the blackout.",
        ]
    },
    fog: {
        tracks: [
            { title: "Fog", artist: "Radiohead", mood: "dissolving" },
            { title: "A Foggy Day", artist: "Ella Fitzgerald", mood: "vintage warmth" },
            { title: "In the Mist", artist: "Nils Frahm", mood: "searching" },
            { title: "Misty", artist: "Erroll Garner", mood: "velvet" },
            { title: "Hazy Shade of Winter", artist: "Simon & Garfunkel", mood: "restless" },
            { title: "Fade Into You", artist: "Mazzy Star", mood: "vanishing" },
            { title: "Lost in the World", artist: "Kanye West", mood: "drifting" },
            { title: "Into the Fog", artist: "Boards of Canada", mood: "memory" },
            { title: "Everything in Its Right Place", artist: "Radiohead", mood: "uncertain clarity" },
            { title: "Teardrop", artist: "Massive Attack", mood: "suspended" },
        ],
        intros: [
            "visibility: zero. clarity: overrated. here's the next one.",
            "the fog makes everything closer and further away at the same time.",
            "you can't see the road but you can hear this. that's enough.",
            "somewhere in the fog, someone left their headlights on. this one's for them.",
        ],
        hostMessages: [
            "the fog doesn't hide things. it just asks if you really need to see them right now.",
            "lost isn't a place. it's a feeling. and it has a great soundtrack.",
            "if you can hear us, you're close enough.",
        ]
    },
    snow: {
        tracks: [
            { title: "Cold as Ice", artist: "Foreigner", mood: "sharp" },
            { title: "Snowflake", artist: "Sia", mood: "fragile" },
            { title: "Winter", artist: "Vivaldi", mood: "baroque fury" },
            { title: "Ice Ice Baby", artist: "Vanilla Ice", mood: "guilty" },
            { title: "Frozen", artist: "Madonna", mood: "still" },
            { title: "White Winter Hymnal", artist: "Fleet Foxes", mood: "circular" },
            { title: "Heirloom", artist: "Bjork", mood: "crystalline" },
            { title: "Snowblind", artist: "Black Sabbath", mood: "buried" },
            { title: "Cold Little Heart", artist: "Michael Kiwanuka", mood: "slow thaw" },
            { title: "The Blower's Daughter", artist: "Damien Rice", mood: "raw cold" },
        ],
        intros: [
            "everything's muffled out there. in here, we turn it up.",
            "snow makes the world quieter. we respectfully disagree.",
            "three inches on the ground. nowhere to go. perfect.",
            "the plows won't come til morning. we've got time.",
        ],
        hostMessages: [
            "snow doesn't fall. it arrives. like a thought you didn't know you were having.",
            "the silence between songs hits different when the world is white.",
            "no one shovels at 3am. that's when you listen.",
        ]
    },
    clear: {
        tracks: [
            { title: "Nightswimming", artist: "R.E.M.", mood: "reflective" },
            { title: "Moon River", artist: "Audrey Hepburn", mood: "timeless" },
            { title: "Clair de Lune", artist: "Debussy", mood: "moonlit" },
            { title: "Under the Stars", artist: "Iron & Wine", mood: "intimate" },
            { title: "Starlight", artist: "Muse", mood: "reaching" },
            { title: "Fly Me to the Moon", artist: "Frank Sinatra", mood: "classic cool" },
            { title: "The Night We Met", artist: "Lord Huron", mood: "aching" },
            { title: "Midnight City", artist: "M83", mood: "neon" },
            { title: "Harvest Moon", artist: "Neil Young", mood: "golden" },
            { title: "Tonight, Tonight", artist: "Smashing Pumpkins", mood: "infinite" },
        ],
        intros: [
            "clear skies. every star accounted for. here's one for the watchers.",
            "no clouds to hide behind tonight. neither should you.",
            "the moon's doing that thing where it makes everything look like a movie.",
            "too beautiful to sleep. too late to be awake. perfect.",
        ],
        hostMessages: [
            "on a clear night you can see everything. or nothing. depends where you're looking.",
            "the stars don't play requests. but we do. well, we don't either. but still.",
            "if you're outside right now, look up. if you're inside, that's okay too.",
        ]
    }
};

let currentWeather = 'rain';
let currentTrackIndex = 0;
let canvas, ctx;
let particles = [];
let animationFrame;

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
    document.getElementById('track-title').textContent = track.title;
    document.getElementById('track-artist').textContent = track.artist;
    document.getElementById('track-mood').textContent = track.mood;

    // Update playlist
    const playlistEl = document.getElementById('playlist');
    playlistEl.innerHTML = '';
    for (let i = 1; i <= 4; i++) {
        const nextTrack = shuffled[(index + i) % shuffled.length];
        const li = document.createElement('li');
        li.innerHTML = `<span class="song-name">${nextTrack.title}</span><span class="song-artist">${nextTrack.artist}</span>`;
        playlistEl.appendChild(li);
    }
}

function updateHostMessage() {
    const messages = PLAYLISTS[currentWeather].hostMessages;
    const msg = messages[Math.floor(Math.random() * messages.length)];
    document.getElementById('host-message').textContent = `"${msg}"`;
}

// Auto-advance tracks
function startAutoAdvance() {
    setInterval(() => {
        currentTrackIndex++;
        showTrack(currentTrackIndex);
        updateHostMessage();
    }, 15000);
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
