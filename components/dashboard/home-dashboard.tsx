"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  BookOpen,
  ClipboardList,
  Brain,
  ChevronRight,
  FileText,
  GraduationCap,
  Library,
  MessageCircle,
  Search,
  Sparkles,
  Trophy,
  Volume2
} from "lucide-react"

import type { Lesson } from "@/types"
import { searchLessons } from "@/lib/search"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface HomeDashboardProps {
  lessons: Lesson[]
}

const featureCards = [
  {
    title: "Flashcard",
    subtitle: "Hafalan kotoba",
    description: "Latihan kosakata per bab dengan flip card dan progress.",
    href: "/flashcards",
    icon: Brain,
    color: "emerald",
    stat: "50 Bab"
  },
  {
    title: "Kuis",
    subtitle: "Latihan cepat",
    description: "Kuis harian, tes kotoba, dan tes bunpou dengan skor.",
    href: "/quizzes",
    icon: Trophy,
    color: "sky",
    stat: "N5-N4"
  },
  {
    title: "Appendices",
    subtitle: "Kana & partikel",
    description: "Hiragana, katakana, partikel penting, dan ringkasan dasar.",
    href: "/appendices",
    icon: Library,
    color: "amber",
    stat: "Kana"
  },
  {
    title: "Bunpou",
    subtitle: "Pola kalimat",
    description: "Lihat semua bunpou dan pola kalimat dari Bab 1–50.",
    href: "/bunpou",
    icon: ClipboardList,
    color: "orange",
    stat: "Bab 1–50"
  },
  {
    title: "Pelajaran",
    subtitle: "Materi bab",
    description: "Buka daftar pelajaran dari Bab 1 sampai Bab 50.",
    href: "/lessons/1",
    icon: BookOpen,
  ClipboardList,
    color: "red",
    stat: "1-50"
  },
  {
    title: "Harmoko Sensei",
    subtitle: "AI belajar",
    description: "Tanya grammar, koreksi kalimat, dan latihan roleplay.",
    href: "#harmoko-sensei",
    icon: MessageCircle,
    color: "violet",
    stat: "AI"
  }
]

const colorMap = {
  emerald: {
    text: "text-emerald-500",
    border: "border-l-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30"
  },
  sky: {
    text: "text-sky-500",
    border: "border-l-sky-500",
    bg: "bg-sky-50 dark:bg-sky-950/30"
  },
  amber: {
    text: "text-amber-500",
    border: "border-l-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/30"
  },
  orange: {
    text: "text-orange-500",
    border: "border-l-orange-500",
    bg: "bg-orange-50 dark:bg-orange-950/30"
  },
  red: {
    text: "text-red-500",
    border: "border-l-red-500",
    bg: "bg-red-50 dark:bg-red-950/30"
  },
  violet: {
    text: "text-violet-500",
    border: "border-l-violet-500",
    bg: "bg-violet-50 dark:bg-violet-950/30"
  }
}

function speakJapanese(text: string) {
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = "ja-JP"
  utterance.rate = 0.85

  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utterance)
}

export function HomeDashboard({ lessons }: HomeDashboardProps) {
  const [query, setQuery] = useState("")

  const totalWords = lessons.reduce(
    (total, lesson) => total + lesson.vocabulary.length,
    0
  )
  const totalGrammar = lessons.reduce(
    (total, lesson) => total + lesson.grammar.length,
    0
  )

  const searchResults = useMemo(() => {
    return searchLessons(lessons, query).slice(0, 8)
  }, [lessons, query])

  return (
    <div className="min-h-screen">
      <section className="relative -mx-4 -mt-6 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 px-4 pb-16 pt-10 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="pointer-events-none absolute left-1/2 top-12 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="relative h-56 w-56 sm:h-64 sm:w-64">
            <div className="absolute left-2 top-8 animate-[floatKana_4s_ease-in-out_infinite] text-3xl font-bold text-blue-400">
              あ
            </div>
            <div className="absolute right-7 top-4 animate-[floatKana_4.6s_ease-in-out_infinite] text-3xl font-bold text-pink-400">
              勉
            </div>
            <div className="absolute right-4 top-24 animate-[floatKana_5s_ease-in-out_infinite] text-3xl font-bold text-cyan-400">
              文
            </div>
            <div className="absolute bottom-10 left-4 animate-[floatKana_5.2s_ease-in-out_infinite] text-3xl font-bold text-pink-400">
              本
            </div>
            <div className="absolute bottom-8 right-9 animate-[floatKana_4.2s_ease-in-out_infinite] text-3xl font-bold text-slate-700 dark:text-slate-200">
              学
            </div>

            <div className="absolute left-8 top-14 rounded-xl bg-white px-3 py-1 text-xs text-indigo-500 shadow-lg dark:bg-slate-900">
              こんにちは
            </div>

            <div className="absolute bottom-12 right-10 rounded-xl bg-white px-3 py-1 text-xs text-sky-500 shadow-lg dark:bg-slate-900">
              がんばって！
            </div>

            <div className="absolute left-1/2 top-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-[1.75rem] bg-white p-2 shadow-2xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
              <video
                src="/splash.mp4"
                autoPlay
                muted
                playsInline
                loop
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>
          </div>

          <h1 className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
            Mondo Library
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-300">
            Belajar bahasa Jepang lebih terstruktur. Cari pelajaran, kotoba,
            bunpou, contoh kalimat, flashcard, dan kuis dari satu dashboard.
          </p>

          <div className="relative mt-8 w-full max-w-2xl">
            <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari pelajaran, kotoba, grammar... contoh: これ, は, pergi, buku"
              className="h-14 rounded-2xl border-blue-400 bg-white pl-14 pr-14 text-base shadow-xl shadow-blue-500/10 focus-visible:ring-blue-400 dark:bg-slate-900"
            />
            <button
              type="button"
              onClick={() => speakJapanese(query || "にほんご")}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-blue-500"
              aria-label="Putar suara kata pencarian"
            >
              <Volume2 className="h-5 w-5" />
            </button>
          </div>

          {query && (
            <div className="mt-4 w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-xl dark:border-slate-800 dark:bg-slate-900">
              {searchResults.length > 0 ? (
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {searchResults.map((result) => (
                    <Link
                      key={`${result.type}-${result.id}`}
                      href={result.href}
                      className="flex items-start gap-3 p-4 transition hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/40">
                        <FileText className="h-4 w-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="secondary">{result.type}</Badge>
                          {result.lessonId && (
                            <Badge variant="outline">
                              Bab {result.lessonId}
                            </Badge>
                          )}
                        </div>
                        <p className="mt-2 font-semibold">{result.title}</p>
                        {result.subtitle && (
                          <p className="mt-1 text-sm text-slate-500">
                            {result.subtitle}
                          </p>
                        )}
                      </div>

                      <ChevronRight className="mt-3 h-5 w-5 text-slate-400" />
                    </Link>
                  ))}

                  <Link
                    href={`/bunpou?q=${encodeURIComponent(query)}`}
                    className="block bg-slate-50 p-4 text-center text-sm font-semibold text-blue-600 transition hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800"
                  >
                    Lihat hasil di Bunpou
                  </Link>
                </div>
              ) : (
                <div className="p-6 text-center">
                  <Sparkles className="mx-auto h-8 w-8 text-slate-400" />
                  <p className="mt-3 font-semibold">Tidak ada hasil</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Coba kata lain seperti “buku”, “kore”, “ikimasu”, atau
                    “partikel”.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-8 py-10">
        <div>
          <div className="flex items-center gap-3">
            <GraduationCap className="h-7 w-7 text-blue-600" />
            <h2 className="text-3xl font-bold tracking-tight">
              Mau belajar apa hari ini?
            </h2>
          </div>
          <p className="mt-3 text-slate-500">
            Pilih mode belajar sesuai kebutuhan kamu, minasan.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featureCards.map((feature) => {
            const colors = colorMap[feature.color as keyof typeof colorMap]
            const Icon = feature.icon

            return (
              <Link
                key={feature.title}
                href={feature.href}
                id={feature.href === "#harmoko-sensei" ? "harmoko-sensei" : undefined}
                className={cn(
                  "group rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900",
                  "border-l-8",
                  colors.border
                )}
              >
                <div className="flex h-full items-center justify-between gap-4 p-6">
                  <div>
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-2xl",
                          colors.bg,
                          colors.text
                        )}
                      >
                        <Icon className="h-6 w-6" />
                      </div>

                      <div>
                        <span className={cn("text-xl font-extrabold", colors.text)}>
                          {feature.title}
                        </span>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                          {feature.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-slate-500">
                      {feature.description}
                    </p>
                    <p className="mt-5 text-xs font-semibold text-slate-500">
                      {feature.stat}
                    </p>
                  </div>

                  <ChevronRight className="h-5 w-5 text-slate-400 transition group-hover:translate-x-1" />
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-5 pb-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <FolderOpenIcon />
              <h2 className="text-3xl font-bold tracking-tight">
                Ringkasan Aplikasi
              </h2>
            </div>
            <p className="mt-3 text-slate-500">
              Semua fitur utama sudah siap dipakai untuk belajar konsisten.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-slate-500">Pelajaran</p>
              <p className="mt-2 text-3xl font-bold">{lessons.length}</p>
              <p className="mt-2 text-sm text-slate-500">
                Bab tersedia dari data materi kamu.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-slate-500">Kotoba</p>
              <p className="mt-2 text-3xl font-bold">{totalWords}</p>
              <p className="mt-2 text-sm text-slate-500">
                Bisa dicari dan dilatih lewat flashcard.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-slate-500">Bunpou</p>
              <p className="mt-2 text-3xl font-bold">{totalGrammar}</p>
              <p className="mt-2 text-sm text-slate-500">
                Ringkasan grammar dan contoh kalimat.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

function FolderOpenIcon() {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40">
      <BookOpen className="h-5 w-5" />
    </div>
  )
}
