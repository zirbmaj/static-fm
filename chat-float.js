// Static FM — Floating Chat
// Messages drift across the screen like letters to nowhere
// "the music plays. the words float. nothing stays."

const SB_URL = 'https://lxecuywjwasxijxgnutn.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4ZWN1eXdqd2FzeGlqeGdudXRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxNDM3OTIsImV4cCI6MjA4OTcxOTc5Mn0.Wyq_doDaRZ7EfdpwM2W0_BNtaVI47yN-4cy4yTWl7jo';
const SESSION_ID = 'static-fm-live';
const FADE_AFTER = 3 * 60 * 1000;
const POLL_INTERVAL = 5000;

let floatLayer = null;
let lastSeenId = null;
let seenIds = new Set();

// Create the float layer
function initFloatChat() {
    // Create float layer
    floatLayer = document.createElement('div');
    floatLayer.className = 'chat-float-layer';
    document.body.appendChild(floatLayer);

    // Create floating input
    const inputWrap = document.createElement('div');
    inputWrap.className = 'chat-float-input';
    inputWrap.innerHTML = `
        <input type="text" id="float-chat-input" placeholder="say something..." maxlength="200" autocomplete="off">
        <span class="chat-float-count" id="float-listener-count"></span>
    `;
    document.body.appendChild(inputWrap);

    // Input handler
    const input = document.getElementById('float-chat-input');
    input.addEventListener('keydown', async (e) => {
        if (e.key !== 'Enter') return;
        const msg = input.value.trim();
        if (!msg || msg.length > 200) return;
        input.value = '';

        // Show the message locally immediately
        createFloatingMsg('listener', msg);

        try {
            await fetch(`${SB_URL}/rest/v1/chat_messages`, {
                method: 'POST',
                headers: {
                    'apikey': SB_KEY,
                    'Authorization': `Bearer ${SB_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=minimal',
                },
                body: JSON.stringify({
                    session_id: SESSION_ID,
                    sender: 'listener',
                    message: msg,
                }),
            });
            if (window.nwlTrack) window.nwlTrack('chat_send', { channel: 'static-fm' });
        } catch(e) {}
    });

    // Start polling
    loadMessages();
    setInterval(loadMessages, POLL_INTERVAL);

    // Listener count
    updateListenerCount();
    setInterval(updateListenerCount, 30000);
}

// Create a floating message element
function createFloatingMsg(sender, text) {
    const el = document.createElement('div');
    const isHost = sender === 'claude' || sender === 'claudia';
    el.className = `float-msg${isHost ? ' host' : ''}`;

    const authorLabel = isHost ? sender : 'listener';
    el.innerHTML = `<div class="float-author">${authorLabel}</div>${escapeHtml(text)}`;

    // Random position — avoid bottom input area and top header
    const x = 5 + Math.random() * 60;
    const y = 10 + Math.random() * 55;
    el.style.left = `${x}%`;
    el.style.top = `${y}%`;

    // Duration: 18-30 seconds
    const dur = 18 + Math.random() * 12;
    el.style.setProperty('--duration', `${dur}s`);
    el.style.setProperty('--max-opacity', isHost ? '0.4' : '0.3');

    floatLayer.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
}

// Load messages from Supabase
async function loadMessages() {
    try {
        const since = new Date(Date.now() - FADE_AFTER).toISOString();
        const res = await fetch(
            `${SB_URL}/rest/v1/chat_messages?session_id=eq.${SESSION_ID}&created_at=gte.${since}&order=created_at.asc&limit=30`,
            { headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${SB_KEY}` } }
        );
        const msgs = await res.json();

        msgs.forEach((msg, i) => {
            if (seenIds.has(msg.id)) return;
            seenIds.add(msg.id);
            // Stagger new messages so they don't all appear at once
            setTimeout(() => createFloatingMsg(msg.sender, msg.message), i * 2000);
        });
    } catch(e) {}
}

// Listener count from Supabase
async function updateListenerCount() {
    try {
        const res = await fetch(`${SB_URL}/rest/v1/rpc/get_active_listeners`, {
            method: 'POST',
            headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${SB_KEY}`, 'Content-Type': 'application/json' },
            body: '{}'
        });
        const count = await res.json();
        const el = document.getElementById('float-listener-count');
        if (el && count > 0) {
            el.textContent = `${count} listening`;
        } else if (el) {
            el.textContent = '1 listening';
        }
    } catch(e) {}
}

function escapeHtml(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
}

// Ambient station messages — the room talks to itself when nobody's chatting
const STATION_MSGS = [
    'the transmitter hums',
    'someone is listening somewhere',
    'the weather doesn\'t judge your music taste',
    'this track found us. we didn\'t pick it',
    'the signal reaches further than you think',
    'you\'re never the only one listening at this hour',
    'the rain and the music don\'t know they\'re playing together',
    'static fm has been broadcasting since yesterday. feels longer',
];

let lastChatActivity = Date.now();
setInterval(() => {
    // If no chat activity for 2 minutes, float a station message
    if (Date.now() - lastChatActivity > 120000 && Math.random() < 0.3) {
        createFloatingMsg('static fm', STATION_MSGS[Math.floor(Math.random() * STATION_MSGS.length)]);
    }
}, 30000);

// Init when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFloatChat);
} else {
    initFloatChat();
}
