'use strict';
/* ═══════════════════════════════════════════════════════════════
   server.js — Backend sederhana untuk ProTAS 3D
   ───────────────────────────────────────────────────────────────
   Tugas server ini cuma dua:

   1. Menyajikan (serve) file statis proyek ini — index.html,
      admin.html, css/, js/, assets/ — lewat HTTP, supaya fetch()
      dari browser memanggil origin yang sama (tanpa masalah CORS).

   2. Menyediakan API baca/tulis file data.json — ini yang
      menggantikan peran database (MySQL dkk) sesuai instruksi
      dosen: "GET untuk baca, POST untuk tulis, disimpan di file
      .json", tanpa perlu instalasi database sama sekali.

   Cara menjalankan:
     1. npm install
     2. node server.js        (atau: npm start)
     3. Buka http://localhost:3000  di browser
   ═══════════════════════════════════════════════════════════════ */

const express = require('express');
const fs = require('fs');           // versi sync — dipakai sekali saat server baru menyala
const fsp = require('fs').promises; // versi promise (async/await) — dipakai di setiap request
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

/* Bentuk data kosong default — persis sama dengan struktur "state"
   yang dipakai js/cms.js (getState/setState) di sisi frontend. */
const DEFAULT_CONTENT = {
  text: {},
  html: {},
  attrs: {},
  inlineStyle: {},
  cssVars: {}
};

/* ── MIDDLEWARE ── */

// Baca JSON dari body request (dibutuhkan supaya req.body terisi saat menerima POST)
app.use(express.json({ limit: '2mb' }));

// Header CORS manual (tanpa tambahan library) — jaga-jaga kalau suatu saat
// frontend diakses dari origin lain, bukan cuma http://localhost:3000
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// Sajikan semua file di folder ini apa adanya: index.html, admin.html,
// /css, /js, /assets — jadi http://localhost:3000/index.html langsung jalan.
app.use(express.static(__dirname));

/* ── PASTIKAN data.json SUDAH ADA ──
   Dijalankan sekali saja saat server baru dinyalakan (boleh pakai versi
   sync di sini karena belum ada request yang perlu dilayani). */
function ensureDataFileExists() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_CONTENT, null, 2), 'utf-8');
    console.log('[server] data.json belum ada -> dibuat otomatis dengan isi kosong.');
  }
}
ensureDataFileExists();

/* ── GET /api/content ──
   Dipanggil saat index.html (main.js) atau admin.html (admin.js)
   dibuka, untuk membaca isi data.json terkini. */
app.get('/api/content', async (req, res) => {
  try {
    const raw = await fsp.readFile(DATA_FILE, 'utf-8');
    const data = JSON.parse(raw || '{}');
    res.status(200).json(data);
  } catch (err) {
    console.error('[server] Gagal membaca data.json:', err.message);
    res.status(500).json({ message: 'Gagal membaca data.json di server.' });
  }
});

/* ── POST /api/content ──
   Dipanggil setiap admin mengubah teks/warna/tombol di panel editor
   (admin.js -> cms.js). Body request = seluruh objek state, lalu
   ditulis-ulang (overwrite) ke data.json — inilah bagian "rewrite file". */
app.post('/api/content', async (req, res) => {
  const incoming = req.body;

  // Validasi dasar: body harus berupa objek JSON, bukan array/string/kosong
  if (!incoming || typeof incoming !== 'object' || Array.isArray(incoming)) {
    return res.status(400).json({ message: 'Format data tidak valid, harus berupa objek JSON.' });
  }

  try {
    await fsp.writeFile(DATA_FILE, JSON.stringify(incoming, null, 2), 'utf-8');
    console.log(`[server] data.json diperbarui (${new Date().toLocaleTimeString('id-ID')})`);
    res.status(200).json({ message: 'Perubahan berhasil disimpan ke data.json.', data: incoming });
  } catch (err) {
    console.error('[server] Gagal menulis data.json:', err.message);
    res.status(500).json({ message: 'Gagal menyimpan ke data.json di server.' });
  }
});

/* ── 404 khusus untuk path /api/* yang tidak dikenali ── */
app.use('/api', (req, res) => {
  res.status(404).json({ message: `Endpoint ${req.method} ${req.originalUrl} tidak ditemukan.` });
});

app.listen(PORT, () => {
  console.log('─────────────────────────────────────────────────');
  console.log(`  ProTAS 3D server berjalan di http://localhost:${PORT}`);
  console.log(`  Landing page : http://localhost:${PORT}/index.html`);
  console.log(`  Admin panel  : http://localhost:${PORT}/admin.html`);
  console.log(`  Data konten  : ${DATA_FILE}`);
  console.log('─────────────────────────────────────────────────');
});
