# CV Generator Static

ATS-friendly CV generator, static site.

Isi data CV sendiri dari kosong, pilih dari beberapa desain formal, atur kategori dan item yang mau dimasukkan, ganti judul bagian, pilih bahasa Indonesia/Inggris, dan unduh PDF gratis.

## Struktur file
- `index.html` — struktur halaman dan markup
- `styles.css` — semua gaya tampilan aplikasi (kertas CV sengaja tetap polos dan ramah ATS)
- `app.js` — logika aplikasi: draf, pratinjau, cek ATS, cek kata kunci, ekspor PDF/DOCX/JSON

## Fitur
- Mode Terang dan Gelap untuk UI aplikasi, pratinjau tetap kertas putih A4
- Template formal satu kolom, font standar, ramah ATS
- Lokasi dari daftar kota/kabupaten Indonesia yang bisa dicari, plus Remote dan Luar Negeri
- Tanggal dengan pemilih bulan-tahun dan opsi Masih berjalan
- Cek ATS dan Cek Kata Kunci Lowongan
- Ekspor PDF, DOCX, teks polos, dan JSON

## Catatan privasi
Versi statis ini tidak menyimpan data di server. Data yang diisi hanya ada di browser pengunjung selama sesi berjalan. Gunakan Ekspor JSON sebagai cadangan.

## Jalankan
Buka `index.html` di browser, atau aktifkan GitHub Pages dengan sumber branch `main` dan folder root.
