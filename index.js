const { Client } = require('discord.js-selfbot-v13');
// const config = require('./config.json');

const config = process.env.APP_CONFIG ? JSON.parse(process.env.APP_CONFIG) : null;

if (!config) {
    console.error("Error: Variabel APP_CONFIG tidak ditemukan di Railway!");
    process.exit(1);
}

// Sekarang kamu tetap bisa pakai config.token, config.activities, dll.
const token = config.token;

const client = new Client({ checkUpdate: false });
 
const activities = config.activities;
let currentIndex = 0;
 
function setActivity() {
  const act = activities[currentIndex];
 
  const activityPayload = {
    name: act.name,
    type: act.type,
    details: act.details || null,
    state: act.state || null,
    url: act.url || null,
    application_id: config.applicationId,
  };
 
  // Tambahkan gambar kalau ada di config
  if (act.largeImage || act.smallImage) {
    activityPayload.assets = {};
    if (act.largeImage) {
      activityPayload.assets.large_image = act.largeImage;
      activityPayload.assets.large_text = act.largeImageText || null;
    }
    if (act.smallImage) {
      activityPayload.assets.small_image = act.smallImage;
      activityPayload.assets.small_text = act.smallImageText || null;
    }
  }
 
  // Tambahkan timestamps kalau ada
  if (act.startTimestamp) {
    activityPayload.timestamps = { start: act.startTimestamp === 'now' ? Date.now() : act.startTimestamp };
  }
 
  // Tambahkan buttons kalau ada (maks 2)
  if (act.buttons && act.buttons.length > 0) {
    activityPayload.buttons = act.buttons.slice(0, 2);
  }
 
  client.user.setPresence({
    status: config.status,
    activities: [activityPayload],
  });
 
  console.log(`[${new Date().toLocaleTimeString()}] Activity → ${act.name} | image: ${act.largeImage || 'none'}`);
  currentIndex = (currentIndex + 1) % activities.length;
}
 
client.on('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
  console.log(`🎨 Application ID: ${config.applicationId}`);
  console.log(`🔄 Rotating ${activities.length} activity setiap ${config.rotateIntervalMinutes} menit\n`);
 
  setActivity();
 
  if (activities.length > 1) {
    setInterval(setActivity, config.rotateIntervalMinutes * 60 * 1000);
  }
});
 
client.on('disconnect', () => {
  console.warn('⚠️  Disconnected. Reconnecting...');
});
 
client.login(config.token);