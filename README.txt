ProTAS 3D — Landing Page + Admin Editor

Cara menjalankan:
1. Ekstrak ZIP.
2. Buka index.html di browser.
3. Klik tombol Masuk di pojok kanan atas.
4. Login admin:
   Username: viki123
   Password: amikom123
5. Setelah masuk, halaman admin.html akan terbuka.
6. Klik section landing page pada preview untuk membuka panel editor.
7. Ubah teks, judul, deskripsi, tombol, warna, dan gambar. Perubahan langsung terlihat di preview.
8. Klik Simpan. Perubahan tersimpan di localStorage browser dan otomatis tampil saat index.html dibuka kembali di browser yang sama.

Catatan penting:
- Website ini dibuat statis tanpa backend/database, sesuai struktur HTML, CSS, JavaScript, dan aset gambar.
- Gambar bisa diganti melalui path file di folder assets/images atau upload langsung dari panel editor.
- Untuk penggunaan produksi lintas perangkat/browser, data editor sebaiknya disambungkan ke backend/database agar perubahan tersimpan secara server-side.
- Versi revisi ini memakai preview embedded sehingga pemilihan section lebih stabil. Jika browser tetap memblokir penyimpanan localStorage saat dibuka dari file://, jalankan folder ini dengan server lokal, misalnya:
  python -m http.server 8000
  lalu buka http://localhost:8000

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
- Karena situs ini statis (tanpa server sungguhan), pengiriman notifikasi
  email otomatis BELUM tersambung. Untuk produksi nyata, sambungkan
  fungsi addLead() di js/cms.js ke layanan seperti Formspree, EmailJS,
  Google Apps Script Web App, atau backend/API buatan sendiri agar data
  juga terkirim sebagai notifikasi/email sungguhan.

