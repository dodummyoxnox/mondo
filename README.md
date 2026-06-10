# Mondo Japanese App

Aplikasi web pembelajaran bahasa Jepang untuk pelajar Indonesia berbasis tema Minna no Nihongo I.

## Fitur

- Next.js 15 App Router + TypeScript
- Tailwind CSS + komponen UI gaya shadcn
- 25 pelajaran sample
- Detail pelajaran: Kosakata, Tata Bahasa, Percakapan, Info Jepang
- Flashcard interaktif dengan flip card
- Spaced repetition sederhana
- Progress tracking dengan localStorage
- Global Search
- Responsive layout
- Dark mode dengan next-themes
- Floating Harmoko Sensei
- Integrasi Vercel AI SDK + Grok API atau OpenAI

## Cara menjalankan

```bash
npm install
npm run dev
```

Buka:

```txt
http://localhost:3000
```

## Setup Harmoko Sensei

Copy `.env.example` menjadi `.env.local`.

Untuk Grok/xAI:

```env
AI_PROVIDER=xai
XAI_API_KEY=isi_api_key_grok_kamu
XAI_MODEL=grok-3-mini
```

Untuk OpenAI:

```env
AI_PROVIDER=openai
OPENAI_API_KEY=isi_api_key_openai_kamu
OPENAI_MODEL=gpt-4o-mini
```

Restart server setelah mengubah `.env.local`.

## Deploy ke Vercel

1. Upload project ke GitHub.
2. Import repository di Vercel.
3. Tambahkan environment variable yang sama seperti `.env.local`.
4. Klik Deploy.

## Catatan Data

Data pelajaran di project ini adalah sample edukatif yang mengikuti tema umum Minna no Nihongo I, bukan salinan verbatim buku.
Silakan lengkapi dengan materi milikmu sendiri.


## Update Kotoba dari TXT

Data kosakata di folder `data/lessons/lesson-1.json` sampai `lesson-50.json`
sudah diisi dari file `kotoba_bab1_50_tanpa_nomor(2).txt`.

Jumlah bab yang berhasil diparse: 50
Total kosakata yang berhasil diparse: 2783

Catatan:
- Bab 1–25 tetap cocok untuk Minna no Nihongo I.
- Bab 26–50 ikut dimasukkan dari TXT agar data kotoba lengkap.
- Grammar Bab 26–50 memakai placeholder agar halaman tetap berjalan dan bisa dilengkapi nanti.


## Update Materi PDF

Bagian grammar, contoh kalimat, percakapan, dan Info Jepang telah diperkaya untuk Bab 1-50 berdasarkan outline materi dari PDF Minna no Nihongo I dan II yang diupload pengguna.

Catatan:
- Konten penjelasan dan contoh kalimat dibuat sebagai ringkasan/orisinal untuk aplikasi belajar.
- Tidak menyalin isi buku secara verbatim.
- Kotoba tetap berasal dari file TXT kotoba Bab 1-50.


## Mode Kuis

Route baru:
- `/quizzes`
- `/quizzes/[lessonId]`

Fitur:
- Soal kosakata Jepang ke Indonesia
- Soal arti Indonesia ke Jepang
- Soal grammar pattern
- Soal arti contoh kalimat
- Progress bar
- Feedback benar/salah
- Skor akhir
- Riwayat hasil kuis di localStorage


## Sistem Kuis Bahasa Jepang V2

Route:
- `/quizzes`
- `/quizzes/[quizId]`

Fitur:
- Header progress: level, streak harian, kuis selesai hari ini.
- Kuis Harian: 12 kuis pendek dalam bentuk card.
- Tes Kemampuan: Tes Umum, Tes Kotoba, Tes Bunpou.
- Tes Kotoba dan Tes Bunpou memakai mode tanpa batas soal + stopwatch.
- Jenis soal: pilihan ganda dan isian singkat.
- Feedback langsung benar/salah + penjelasan.
- Halaman hasil: skor, persentase, waktu pengerjaan, tombol coba lagi, menu kuis, dan bagikan hasil.
- Progress tersimpan di localStorage.
- Bank soal sample 50+ soal N5-N4.


## Splash Screen

Project ini sudah memakai splash screen saat web pertama dibuka dan loading screen route Next.js.
Asset video berada di:

```txt
public/splash.mp4
```

Teks kecil di navbar di bawah Mondo sudah diubah menjadi:

```txt
Bahaya Laten
```


## Mode Materi

Route baru:
- `/materi`

Fitur:
- Tampilan seperti Nihongo Library.
- Hero dengan logo animasi video `public/splash.mp4`.
- Search bar besar.
- Kategori berdasarkan level N5, N4, N3, N2, N1.
- Grid file materi.
- Menu Materi ditambahkan di bawah Appendices.


## Dashboard Library

Mode Materi sudah dihapus sebagai route terpisah.
Tampilan library sekarang dipindahkan menjadi Dashboard utama `/`.

Perubahan:
- `/materi` dihapus.
- Menu Materi dihapus dari sidebar/mobile nav.
- Dashboard memakai animasi logo video.
- Search di bawah logo mencari pelajaran, kotoba, dan grammar.
- Card N5-N1 diganti menjadi link fitur: Flashcard, Kuis, Appendices, Search, Pelajaran, Harmoko Sensei.


## Mode Bunpou

Mode Search/Cari di menu utama sudah diganti menjadi `Bunpou`.

Route baru:
- `/bunpou`

Fitur:
- Menampilkan semua bunpou/pola kalimat dari Bab 1 sampai Bab 50.
- Search pola, penjelasan, contoh kalimat, romaji, dan arti Indonesia.
- Filter berdasarkan bab.
- Contoh kalimat dengan tombol suara Jepang.
- Link cepat kembali ke halaman lesson.
