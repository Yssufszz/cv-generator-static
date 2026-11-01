# CuVys v2.9.0

Alat CV statis yang ramah ATS: isi data sendiri dari kosong, atur bagian, pilih desain formal, dan unduh PDF gratis.

Nama situsnya CuVys.

## Struktur file
- `index.html` - landing page
- `app.html` - struktur halaman aplikasi
- `landing.css` - gaya landing page
- `icon.svg` - ikon situs (lingkaran navy)
- `styles.css` - gaya tampilan aplikasi (kertas CV sengaja tetap polos dan ramah ATS)
- `app.js` - logika aplikasi: draf, pratinjau, cek ATS, cek kata kunci, ekspor PDF/DOCX/JSON

## Fitur
- Mode Terang dan Gelap, pratinjau tetap kertas putih A4
- 17 template formal satu kolom, ramah ATS, termasuk Formal Dokumen (serif Times, judul tengah bergaris atas, perusahaan di atas jabatan, kontak dua kolom)
- Posisi kepala CV bisa Kiri, Tengah, atau Kanan
- Relokasi ditulis di samping domisili dengan format "Domisili : Kota - (Terbuka untuk relokasi)" / "Domicile : City - (Open to relocation)", bukan baris terpisah
- Perataan isi CV (rata kiri, tengah, rata kanan, justify) berlaku di pratinjau, PDF, dan DOCX; kepala CV tidak ikut
- Label kontak mengikuti bahasa CV (Domisili / Nomor Handphone vs Domicile / Mobile) di pratinjau, PDF, DOCX, dan teks; toggle "Terbuka untuk relokasi" menambah baris "Terbuka untuk relokasi" / "Open for relocation" di semua output - nama, jabatan, dan kontak yang pindah, isi CV tetap rata kiri (juga berlaku di PDF)
- Lokasi dari daftar kota/kabupaten Indonesia yang bisa dicari, plus Remote dan Luar Negeri
- Tanggal dengan pemilih bulan-tahun dan opsi Masih berjalan
- Cek ATS dan Cek Kata Kunci Lowongan, termasuk tombol tambah kata kunci yang kurang sebagai keahlian
- Saran poin awal untuk tiap pengalaman kerja (template lokal, bisa diedit)
- Asisten CV lokal melayang (tombol kanan bawah): rekomendasi ringkasan dari data yang diisi, cek yang kurang, cek ATS singkat, dan chat yang bisa mengeksekusi perintah berbasis data - tanpa AI eksternal dan tanpa kirim data ke server
- Mode Fokus, salin ringkasan, dan peringatan sebelum tab ditutup kalau ada perubahan yang belum diekspor
- Ekspor PDF, DOCX, teks polos, dan JSON
- Autosave lokal: data tersimpan otomatis di browser ini dan dipulihkan saat dibuka lagi; foto tidak ikut tersimpan lokal, dan Ekspor JSON tetap jadi cadangan lintas perangkat serta fallback kalau penyimpanan lokal tidak tersedia atau penuh

## Catatan privasi
Versi statis ini tidak menyimpan data di server dan tidak memakai AI eksternal (Asisten CV sepenuhnya lokal). Penyimpanan otomatisnya hanya di browser pengunjung, bukan di server. Data yang diisi hanya ada di browser pengunjung selama sesi berjalan. Gunakan Ekspor JSON sebagai cadangan.

## Versi
Versi situs tampil di footer. Setiap update menaikkan nomor versi di footer, di README ini, dan di komentar atas `index.html`.

## Jalankan
Buka `index.html` di browser, atau aktifkan GitHub Pages dengan sumber branch `main` dan folder root.
