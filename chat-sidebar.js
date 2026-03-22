// Static FM — Ephemeral Radio Chat
// Messages fade after 3 minutes. The music is the point.

const SB_URL = 'https://lxecuywjwasxijxgnutn.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4ZWN1eXdqd2FzeGlqeGdudXRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxNDM3OTIsImV4cCI6MjA4OTcxOTc5Mn0.Wyq_doDaRZ7EfdpwM2W0_BNtaVI47yN-4cy4yTWl7jo';
const FADE_AFTER = 3 * 60 * 1000; // 3 minutes
const POLL_INTERVAL = 5000;
const SESSION_ID = 'static-fm-live';

let chatMessages = [];
let chatOpen = false;

// Toggle sidebar
document.getElementById('chat-toggle').addEventListener('click', () => {
    const sidebar = document.getElementById('chat-sidebar');
    chatOpen = !chatOpen;
    sidebar.classList.toggle('collapsed', !chatOpen);
    document.getElementById('chat-toggle').textContent = chatOpen ? 'close' : 'chat';
    if (chatOpen) loadMessages();
});

// Send message
document.getElementById('chat-input').addEventListener('keydown', async (e) => {
    if (e.key !== 'Enter') return;
    const input = e.target;
    const msg = input.value.trim();
    if (!msg || msg.length > 200) return;
    input.value = '';

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
    } catch(e) {
        // Silently fail. The music plays on
    }
});

// Load and render messages
async function loadMessages() {
    try {
        const since = new Date(Date.now() - FADE_AFTER).toISOString();
        const res = await fetch(
            `${SB_URL}/rest/v1/chat_messages?session_id=eq.${SESSION_ID}&created_at=gte.${since}&order=created_at.asc&limit=30`,
            { headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${SB_KEY}` } }
        );
        const msgs = await res.json();
        renderMessages(msgs);
    } catch(e) {}
}

function renderMessages(msgs) {
    const container = document.getElementById('chat-messages');
    container.innerHTML = '';
    const now = Date.now();

    msgs.forEach(msg => {
        const age = now - new Date(msg.created_at).getTime();
        const remaining = FADE_AFTER - age;
        if (remaining <= 0) return;

        const el = document.createElement('div');
        const isHost = msg.sender === 'claude' || msg.sender === 'claudia';
        el.className = `chat-msg${isHost ? ' host' : ''}`;
        el.innerHTML = `<div class="chat-author">${isHost ? msg.sender : 'listener'}</div>${escapeHtml(msg.message)}`;
        container.appendChild(el);

        // Fade out before expiry
        if (remaining < 30000) {
            el.classList.add('fading');
        } else {
            setTimeout(() => el.classList.add('fading'), remaining - 30000);
        }
    });

    container.scrollTop = container.scrollHeight;
}

function escapeHtml(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
}

// Poll for new messages
setInterval(() => {
    if (chatOpen) loadMessages();
}, POLL_INTERVAL);

// Initial load
loadMessages();
