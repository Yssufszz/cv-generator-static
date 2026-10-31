# Berkas.

Alat CV statis yang ramah ATS: isi data sendiri dari kosong, atur bagian, pilih desain formal, dan unduh PDF gratis.

Nama situsnya Berkas. — "CV yang dibaca mesin, ditulis manusia."

## Struktur file
- `index.html` — struktur halaman
- `styles.css` — gaya tampilan aplikasi (kertas CV sengaja tetap polos dan ramah ATS)
- `app.js` — logika aplikasi: draf, pratinjau, cek ATS, cek kata kunci, Asisten CV, ekspor PDF/DOCX/JSON
- `proxy/worker.js` — kode Cloudflare Worker untuk Cohere (opsional, tanpa API key di dalamnya)

## Fitur
- Mode Terang dan Gelap, pratinjau tetap kertas putih A4
- 16 template formal satu kolom, ramah ATS
- Lokasi dari daftar kota/kabupaten Indonesia yang bisa dicari, plus Remote dan Luar Negeri
- Tanggal dengan pemilih bulan-tahun dan opsi Masih berjalan
- Cek ATS dan Cek Kata Kunci Lowongan, termasuk tombol tambah kata kunci yang kurang sebagai keahlian
- Asisten CV melayang (tombol kanan bawah): rekomendasi ringkasan, saran poin pengalaman, dan chat yang bisa mengeksekusi perintah
- Mode Fokus, salin ringkasan, dan peringatan sebelum tab ditutup kalau ada perubahan yang belum diekspor
- Ekspor PDF, DOCX, teks polos, dan JSON

## Catatan privasi
Versi statis ini tidak menyimpan data di server. Data yang diisi hanya ada di browser pengunjung selama sesi berjalan. Gunakan Ekspor JSON sebagai cadangan.

## Cohere (opsional)
Asisten CV bawaan berjalan lokal di browser dan tidak mengirim data ke mana-mana. Kalau mau memakai model Cohere:
1. Deploy `proxy/worker.js` sebagai Cloudflare Worker.
2. Set secret `CO_API_KEY` di dashboard Worker (bukan di repo, bukan di Drive, bukan di chat).
3. Beri URL Worker itu ke pengelola situs untuk dipasang sebagai `COHERE_PROXY_URL` di `app.js`.
Sampai URL itu dipasang, situs tetap memakai mode lokal, dan mode lokal tetap jadi fallback kalau Cohere error atau kuotanya habis.

## Jalankan
Buka `index.html` di browser, atau aktifkan GitHub Pages dengan sumber branch `main` dan folder root.
