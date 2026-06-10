import type { JapaneseQuizDefinition } from "@/types"

export const dailyQuizzes: JapaneseQuizDefinition[] = [
  {
    id: "daily-kana-start",
    title: "Pemanasan Kana",
    subtitle: "Hiragana & Katakana dasar",
    description: "Kuis ringan buat mulai hari. Cocok sebelum masuk kotoba.",
    kind: "daily",
    category: "kana",
    level: "N5",
    totalQuestions: 10,
    timed: false,
    unlimited: false,
    icon: "kana",
    color: "from-pink-500 to-rose-500",
    tags: ["kana", "hiragana", "katakana"]
  },
  {
    id: "daily-kotoba-n5",
    title: "Kotoba N5 Cepat",
    subtitle: "Kosakata dasar",
    description: "Latihan arti dan bacaan kosakata N5.",
    kind: "daily",
    category: "kotoba",
    level: "N5",
    totalQuestions: 10,
    timed: false,
    unlimited: false,
    icon: "book",
    color: "from-blue-500 to-cyan-500",
    tags: ["kotoba", "N5"]
  },
  {
    id: "daily-particle",
    title: "Partikel Mini",
    subtitle: "は・が・を・に・で",
    description: "Biar partikel nggak ketuker terus, minasan.",
    kind: "daily",
    category: "particle",
    level: "N5",
    totalQuestions: 10,
    timed: false,
    unlimited: false,
    icon: "spark",
    color: "from-amber-500 to-orange-500",
    tags: ["particle", "bunpou"]
  },
  {
    id: "daily-bunpou-basic",
    title: "Bunpou Basic",
    subtitle: "Grammar dasar N5",
    description: "Pola kalimat dasar untuk percakapan harian.",
    kind: "daily",
    category: "bunpou",
    level: "N5",
    totalQuestions: 10,
    timed: false,
    unlimited: false,
    icon: "brain",
    color: "from-violet-500 to-purple-500",
    tags: ["bunpou", "grammar"]
  },
  {
    id: "daily-kanji-n5",
    title: "Kanji N5",
    subtitle: "Kanji dasar",
    description: "Latihan arti dan bacaan kanji paling awal.",
    kind: "daily",
    category: "kanji",
    level: "N5",
    totalQuestions: 10,
    timed: false,
    unlimited: false,
    icon: "kanji",
    color: "from-slate-700 to-slate-950",
    tags: ["kanji", "N5"]
  },
  {
    id: "daily-verb-form",
    title: "Bentuk Kata Kerja",
    subtitle: "ます・て・ない・kamus",
    description: "Latihan perubahan kata kerja yang sering bikin bingung.",
    kind: "daily",
    category: "verb",
    level: "N5",
    totalQuestions: 10,
    timed: false,
    unlimited: false,
    icon: "bolt",
    color: "from-emerald-500 to-teal-500",
    tags: ["verb", "bunpou"]
  },
  {
    id: "daily-adjective",
    title: "Kata Sifat",
    subtitle: "い-adj & な-adj",
    description: "Latihan bentuk positif, negatif, dan lampau.",
    kind: "daily",
    category: "adjective",
    level: "N5",
    totalQuestions: 10,
    timed: false,
    unlimited: false,
    icon: "star",
    color: "from-yellow-500 to-amber-500",
    tags: ["adjective", "bunpou"]
  },
  {
    id: "daily-fill-blank",
    title: "Isi Bagian Kosong",
    subtitle: "Fill in the blank",
    description: "Latihan aktif mengetik jawaban, bukan cuma memilih.",
    kind: "daily",
    category: "mixed",
    level: "N5-N4",
    totalQuestions: 10,
    timed: false,
    unlimited: false,
    icon: "pen",
    color: "from-fuchsia-500 to-pink-500",
    tags: ["fill-blank"]
  },
  {
    id: "daily-n4-step",
    title: "Naik Level N4",
    subtitle: "Grammar awal N4",
    description: "Mulai kenalan dengan pola N4 pelan-pelan.",
    kind: "daily",
    category: "bunpou",
    level: "N4",
    totalQuestions: 10,
    timed: false,
    unlimited: false,
    icon: "rocket",
    color: "from-indigo-500 to-blue-500",
    tags: ["N4", "bunpou"]
  },
  {
    id: "daily-mixed-01",
    title: "Campuran Santai",
    subtitle: "Kana, kotoba, bunpou",
    description: "Kuis campuran ringan buat jaga streak harian.",
    kind: "daily",
    category: "mixed",
    level: "N5-N4",
    totalQuestions: 12,
    timed: false,
    unlimited: false,
    icon: "mix",
    color: "from-green-500 to-emerald-500",
    tags: ["mixed"]
  },
  {
    id: "daily-mixed-02",
    title: "Review Cepat",
    subtitle: "10 soal pendek",
    description: "Cocok buat latihan sebelum tidur.",
    kind: "daily",
    category: "mixed",
    level: "N5",
    totalQuestions: 10,
    timed: false,
    unlimited: false,
    icon: "clock",
    color: "from-cyan-500 to-sky-500",
    tags: ["mixed", "review"]
  },
  {
    id: "daily-minasan",
    title: "Konsisten Bareng",
    subtitle: "Kuis harian minasan",
    description: "Satu sesi kecil hari ini lebih baik daripada nunggu sempurna.",
    kind: "daily",
    category: "mixed",
    level: "N5-N4",
    totalQuestions: 15,
    timed: false,
    unlimited: false,
    icon: "heart",
    color: "from-red-500 to-pink-500",
    tags: ["daily", "mixed"]
  }
]

export const abilityTests: JapaneseQuizDefinition[] = [
  {
    id: "test-umum",
    title: "Tes Umum",
    subtitle: "Tanpa batas waktu",
    description: "Tes campuran N5-N4 untuk mengukur kemampuan umum.",
    kind: "ability",
    category: "mixed",
    level: "N5-N4",
    totalQuestions: 30,
    timed: false,
    unlimited: false,
    icon: "trophy",
    color: "from-slate-700 to-slate-950",
    tags: ["test", "general"]
  },
  {
    id: "test-kotoba",
    title: "Tes Kotoba",
    subtitle: "Tanpa batas soal + stopwatch",
    description: "Latihan kosakata sebanyak yang kamu mau. Stopwatch berjalan.",
    kind: "ability",
    category: "kotoba",
    level: "N5-N4",
    totalQuestions: null,
    timed: true,
    unlimited: true,
    icon: "book",
    color: "from-blue-500 to-indigo-500",
    tags: ["test", "kotoba", "stopwatch"]
  },
  {
    id: "test-bunpou",
    title: "Tes Bunpou",
    subtitle: "Tanpa batas soal + stopwatch",
    description: "Latihan grammar tanpa batas. Cocok buat drilling pola kalimat.",
    kind: "ability",
    category: "bunpou",
    level: "N5-N4",
    totalQuestions: null,
    timed: true,
    unlimited: true,
    icon: "brain",
    color: "from-purple-500 to-violet-500",
    tags: ["test", "bunpou", "stopwatch"]
  }
]

export const quizDefinitions = [...dailyQuizzes, ...abilityTests]

export function getAllQuizDefinitions() {
  return quizDefinitions
}

export function getQuizDefinitionById(id: string) {
  return quizDefinitions.find((quiz) => quiz.id === id)
}
