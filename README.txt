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
