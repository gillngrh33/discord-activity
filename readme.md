# Discord Custom Activity — Always Online

Self-bot Node.js buat custom activity Discord yang selalu aktif.

---

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Dapetin User Token Discord

1. Buka Discord di **browser** (bukan desktop app)
2. Buka DevTools → `F12`
3. Masuk ke tab **Network**
4. Filter: ketik `api`
5. Klik sembarang request ke Discord API
6. Di bagian **Request Headers**, cari `Authorization`
7. Nilai di sana = user token kamu

> ⚠️ **Jangan pernah share token ini ke siapapun.**

### 3. Edit `config.json`

```json
{
  "token": "TOKEN_KAMU_DI_SINI",
  "status": "online",
  "rotateIntervalMinutes": 30,
  "activities": [ ... ]
}
```

#### Tipe Activity (`type`)
| Angka | Tampilan di Discord |
|-------|-------------------|
| 0     | **Playing** Nama  |
| 1     | **Live on Twitch** (butuh `url` Twitch/YT) |
| 2     | **Listening to** Nama |
| 3     | **Watching** Nama |
| 5     | **Competing in** Nama |

### 4. Jalankan
```bash
npm start
```

---

## Deploy 24/7

### Railway (gratis, paling mudah)
1. Push ke GitHub
2. Buka [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Set environment variable: `TOKEN=token_kamu` (opsional, bisa langsung di config.json)
4. Done — Railway otomatis jaga proses tetap jalan

### VPS (Ubuntu)
```bash
# Install PM2 process manager
npm install -g pm2

# Jalankan dan set auto-start
pm2 start index.js --name discord-activity
pm2 startup
pm2 save
```

### Termux (Android)
```bash
pkg install nodejs
git clone <repo-kamu>
cd discord-activity
npm install
npm start
# Gunakan tmux atau nohup biar tetap jalan di background
```

---

## Catatan

- Kalau `activities` cuma 1 item, rotasi otomatis dinonaktifkan
- Status bisa: `online`, `idle`, `dnd`, `invisible`
- Untuk type `1` (Streaming), field `url` **wajib** diisi dengan URL Twitch atau YouTube

---

> **⚠️ Peringatan:** Self-bot melanggar ToS Discord.
> Gunakan dengan bijak, jangan disalahgunakan.