const { Client } = require('discord.js-selfbot-v13');
const config = require('./config.json');

const client = new Client({ checkUpdate: false });

// ── Daftar activity yang akan di-rotate ──────────────────────────────────────
const activities = config.activities;
let currentIndex = 0;

function setActivity() {
  const act = activities[currentIndex];

  client.user.setPresence({
    status: config.status, // 'online' | 'idle' | 'dnd' | 'invisible'
    activities: [
      {
        name: act.name,
        type: act.type, // 0=Playing, 1=Streaming, 2=Listening, 3=Watching, 5=Competing
        details: act.details || null,
        state: act.state || null,
        url: act.url || null, // Wajib diisi kalau type=1 (Streaming), harus URL Twitch/YT
      },
    ],
  });

  console.log(`[${new Date().toLocaleTimeString()}] Activity set → ${act.name} (type ${act.type})`);
  currentIndex = (currentIndex + 1) % activities.length;
}

client.on('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
  console.log(`🎮 Starting activity rotation every ${config.rotateIntervalMinutes} minute(s)...\n`);

  // Set activity pertama langsung
  setActivity();

  // Rotate activity sesuai interval (kalau activities > 1)
  if (activities.length > 1) {
    setInterval(setActivity, config.rotateIntervalMinutes * 60 * 1000);
  }
});

client.on('disconnect', () => {
  console.warn('⚠️  Disconnected. Reconnecting...');
});

client.login(config.token);