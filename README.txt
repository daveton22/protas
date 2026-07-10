ProTAS 3D — Landing Page + Admin Editor + Backend (Express + JSON file)

Cara menjalankan (dengan server/backend — direkomendasikan):
1. Ekstrak ZIP, buka folder ProTAS_3D lewat terminal.
2. Jalankan:  npm install
3. Jalankan:  node server.js   (atau: npm start)
4. Terminal akan menampilkan "ProTAS 3D server berjalan di http://localhost:3000"
5. Buka http://localhost:3000/index.html di browser.
6. Klik tombol Masuk di pojok kanan atas, atau buka http://localhost:3000/admin.html langsung.
7. Login admin:
   Username: viki123
   Password: amikom123
8. Klik section landing page pada preview untuk membuka panel editor.
9. Ubah teks, judul, deskripsi, tombol, warna, dan gambar. Perubahan langsung terlihat di preview
   DAN otomatis terkirim (POST) ke server untuk ditulis ke data.json.
10. Klik Simpan untuk konfirmasi eksplisit bahwa data sudah tersimpan ke data.json di server.
11. Buka index.html di perangkat/browser lain (masih lewat http://localhost:3000) — konten
    hasil edit admin akan ikut tampil, karena sumber datanya sekarang di server, bukan cuma
    localStorage satu browser saja.

Cara menjalankan (tanpa server — mode cadangan/lama):
Kalau server.js tidak dijalankan, index.html & admin.html tetap bisa dibuka langsung (double click
atau lewat "python -m http.server") dan tetap berfungsi seperti sebelumnya — perubahan admin
otomatis jatuh kembali (fallback) ke localStorage per-browser saja, karena setiap fetch() ke
server akan gagal dengan tenang (lihat console browser: "server belum jalan").

Catatan penting:
- Backend server.js dibuat pakai Express.js + modul fs (BUKAN database seperti MySQL), sesuai
  instruksi dosen: penyimpanan dilakukan dengan cara menulis-ulang (rewrite) file data.json.
- Gambar bisa diganti melalui path file di folder assets/images atau upload langsung dari panel editor
  (data gambar ter-encode base64 dan ikut tersimpan sebagai bagian dari data.json).
- Data prospek dari Formulir Kontak (lihat bagian "Fitur Prospek" di bawah) MASIH memakai
  localStorage, belum dipindah ke backend — lihat catatan di bagian itu.

──────────────────────────────────────────
UPDATE — Pelengkap 10 Anatomi Landing Page
──────────────────────────────────────────
3 section berikut ditambahkan agar landing page memenuhi ke-10 unsur
anatomi (headline, sub-headline, hero, UVP, manfaat, fitur, social proof,
CTA, garansi, formulir kontak):

4. UVP  → section id="kenapa-protas" (setelah Trusted Logos, sebelum Fitur)
          Perbandingan "Cara Lama" vs "Dengan ProTAS" untuk menegaskan
          alasan kompetitif memilih ProTAS.
9. Garansi → section id="garansi" (setelah FAQ, sebelum CTA)
          4 poin risk-reducer: keamanan data, uang kembali 30 hari
          (paket Premium/Institusi), gratis tanpa kartu kredit, dan
          dukungan responsif.
10. Formulir Kontak → section id="kontak" (setelah CTA, sebelum Footer)
          Form Nama, Email, Peran, dan Pesan untuk menjaring prospek
          (mahasiswa/dosen/institusi).

Semua section baru ini otomatis bisa diklik & diedit dari admin.html —
teks, judul, deskripsi, label, dan tombolnya mengikuti sistem CMS yang
sama seperti section lain (klik section → edit teks/tombol/warna → Simpan).

Fitur "📋 Prospek" (admin.html, topbar):
- Setiap kali formulir Kontak di landing page diisi & dikirim, datanya
  otomatis tersimpan (localStorage, key: protas_cms_leads_v1) dan bisa
  dilihat admin lewat tombol "📋 Prospek" di pojok kanan atas admin.html.
- Di situ admin bisa melihat daftar prospek (nama, email, peran, pesan,
  waktu), menghapus satu per satu atau semua, dan mengunduh sebagai CSV.
- Data prospek ini BELUM dipindah ke server.js/data.json (backend baru di bawah
  ini khusus untuk konten landing page, sesuai permintaan). Kalau mau
  prospek juga ikut tersimpan di server dengan pola yang sama, tinggal minta —
  polanya sama persis seperti /api/content, tinggal tambah /api/leads.
- Untuk notifikasi email otomatis ke tim, sambungkan fungsi addLead() di
  js/cms.js ke layanan seperti Formspree, EmailJS, atau backend/API sendiri.

──────────────────────────────────────────
UPDATE — Backend Sederhana (Express + data.json)
──────────────────────────────────────────
Sebelumnya seluruh perubahan admin (teks/warna/gambar) HANYA tersimpan di
localStorage — artinya cuma tersimpan di satu browser, tidak tersinkron ke
perangkat/browser lain. Update ini menambahkan backend sederhana yang
menyimpan perubahan itu ke file data.json di server, menggantikan peran
database sesuai instruksi dosen (belum boleh pakai MySQL dkk).

Cara kerja singkat:
  1. server.js (Express + fs) menyediakan 2 endpoint:
       GET  /api/content   -> baca isi data.json, kembalikan sebagai JSON
       POST /api/content   -> terima JSON dari body request, tulis-ulang
                               (fs.writeFile) ke data.json
  2. js/cms.js jadi "jembatan" ke server ini:
       - setState(...)              -> simpan ke localStorage (instan) +
                                        POST ke server (async, di background)
       - syncContentFromServer()    -> GET dari server, lalu terapkan ke
                                        halaman (dipanggil dari main.js &
                                        admin.js saat halaman dibuka)
  3. js/main.js  (index.html) memanggil syncContentFromServer() di baris
     paling atas, supaya pengunjung selalu melihat versi konten terbaru
     dari data.json, bukan cuma localStorage browser mereka sendiri.
  4. js/admin.js memanggil syncContentFromServer() sebelum preview pertama
     dibangun (supaya panel editor mulai dari data terbaru), dan tombol
     "Simpan" memanggil cms.pushContentToServer() secara eksplisit dengan
     notifikasi sukses/gagal yang terlihat jelas di layar.

Kenapa localStorage tetap dipakai (bukan dihapus total)?
  Supaya panel admin tetap terasa instan (baca/tulis data secara synchronous,
  tanpa nunggu jaringan setiap kali mengetik satu huruf), dan supaya situs
  tetap berfungsi walau server.js kebetulan sedang tidak menyala (fallback
  otomatis, lihat "Cara menjalankan (tanpa server)" di atas). data.json di
  server tetap jadi sumber data yang sesungguhnya/permanen.

File baru yang ditambahkan:
  server.js        - server Express + endpoint GET/POST /api/content
  package.json     - daftar dependency (express) + script "npm start"
  package-lock.json- versi persis dependency (auto-generate oleh npm install)
  data.json        - dibuat OTOMATIS oleh server.js saat pertama kali
                      dijalankan (tidak perlu dibuat manual, dan sengaja
                      tidak ikut dikirim di ZIP ini supaya selalu mulai
                      dari keadaan bersih)
  .gitignore       - supaya node_modules/ & data.json tidak ikut ke-commit
                      kalau proyek ini dimasukkan ke Git

