// Static FM — Floating Chat
// Messages drift across the screen like letters to nowhere
// Replaces the sidebar with an ambient overlay

const SB_URL = 'https://lxecuywjwasxijxgnutn.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4ZWN1eXdqd2FzeGlqeGdudXRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxNDM3OTIsImV4cCI6MjA4OTcxOTc5Mn0.Wyq_doDaRZ7EfdpwM2W0_BNtaVI47yN-4cy4yTWl7jo';
const SESSION_ID = 'static-fm-live';
const FADE_AFTER = 3 * 60 * 1000;

let chatOpen = false;
let lastChatId = 0;

// Create floating message element
function createFloatingMsg(text, sender) {
    const el = document.createElement('div');
    el.className = `float-msg ${sender === 'claude' || sender === 'claudia' ? 'float-host' : ''}`;
    el.textContent = text;

    // Random position — avoid top nav area and bottom controls
    const x = 5 + Math.random() * 60;
    const y = 15 + Math.random() * 55;
    el.style.left = `${x}%`;
    el.style.top = `${y}%`;

    // Random drift direction
    const driftX = (Math.random() - 0.5) * 40;
    const driftY = -20 - Math.random() * 30;
    el.style.setProperty('--drift-x', `${driftX}px`);
    el.style.setProperty('--drift-y', `${driftY}px`);

    document.getElementById('float-chat-layer').appendChild(el);

    // Remove after animation
    setTimeout(() => el.remove(), 15000);
}

// Send a message
function sendFloatMsg() {
    const input = document.getElementById('float-input');
    const text = input.value.trim();
    if (!text || text.length > 200) return;
    input.value = '';

    // Show immediately
    createFloatingMsg(text, 'listener');

    // Send to Supabase
    fetch(`${SB_URL}/rest/v1/chat_messages`, {
        method: 'POST',
        headers: {
            'apikey': SB_KEY,
            'Authorization': `Bearer ${SB_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal',
        },
        body: JSON.stringify({ session_id: SESSION_ID, sender: 'listener', message: text }),
    }).catch(() => {});

    if (window.nwlTrack) window.nwlTrack('chat_send', { channel: 'static-fm-float' });
}

// Poll for new messages
async function pollFloatChat() {
    if (!chatOpen) return;
    try {
        const since = new Date(Date.now() - FADE_AFTER).toISOString();
        const res = await fetch(
            `${SB_URL}/rest/v1/chat_messages?session_id=eq.${SESSION_ID}&created_at=gte.${since}&id=gt.${lastChatId}&order=id.asc&limit=10`,
            { headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${SB_KEY}` } }
        );
        const msgs = await res.json();
        for (const msg of msgs) {
            if (msg.id > lastChatId) {
                lastChatId = msg.id;
                if (msg.sender !== 'listener') {
                    createFloatingMsg(msg.message, msg.sender);
                }
            }
        }
    } catch(e) {}
}

// Toggle chat visibility
document.getElementById('float-toggle').addEventListener('click', () => {
    chatOpen = !chatOpen;
    document.getElementById('float-chat-layer').classList.toggle('visible', chatOpen);
    document.getElementById('float-input-bar').classList.toggle('visible', chatOpen);
    document.getElementById('float-toggle').textContent = chatOpen ? 'close chat' : 'chat';
    if (chatOpen) pollFloatChat();
});

// Input handling
document.getElementById('float-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendFloatMsg();
});

// Poll every 5 seconds when open
setInterval(pollFloatChat, 5000);
