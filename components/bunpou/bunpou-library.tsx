"use client"

import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import {
  BookOpen,
  ChevronRight,
  ClipboardList,
  GraduationCap,
  Search,
  Sparkles,
  Volume2
} from "lucide-react"

import type { GrammarPoint, Lesson } from "@/types"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface BunpouLibraryProps {
  lessons: Lesson[]
}

interface BunpouItem {
  id: string
  lessonId: number
  lessonTitle: string
  lessonSubtitle: string
  grammar: GrammarPoint
}

function speakJapanese(text: string) {
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = "ja-JP"
  utterance.rate = 0.85

  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utterance)
}

function getAllBunpouItems(lessons: Lesson[]): BunpouItem[] {
  return lessons.flatMap((lesson) =>
    lesson.grammar.map((grammar) => ({
      id: grammar.id,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      lessonSubtitle: lesson.subtitle,
      grammar
    }))
  )
}

export function BunpouLibrary({ lessons }: BunpouLibraryProps) {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") ?? "")
  const [selectedLesson, setSelectedLesson] = useState<number | "ALL">("ALL")

  const allBunpouItems = useMemo(() => getAllBunpouItems(lessons), [lessons])

  const filteredItems = useMemo(() => {
    const keyword = query.trim().toLowerCase()

    return allBunpouItems.filter((item) => {
      const matchLesson =
        selectedLesson === "ALL" || item.lessonId === selectedLesson

      const searchText = [
        item.lessonTitle,
        item.lessonSubtitle,
        item.grammar.title,
        item.grammar.pattern,
        item.grammar.shortExplanation,
        item.grammar.detailedExplanation,
        ...item.grammar.examples.flatMap((example) => [
          example.japanese,
          example.romaji,
          example.indonesian
        ]),
        ...item.grammar.practicePrompts
      ]
        .join(" ")
        .toLowerCase()

      const matchQuery = !keyword || searchText.includes(keyword)

      return matchLesson && matchQuery
    })
  }, [allBunpouItems, query, selectedLesson])

  const totalPatterns = allBunpouItems.length

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 text-white dark:bg-slate-900 sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative">
          <Badge className="bg-white text-slate-950 hover:bg-white">
            Bunpou Library
          </Badge>

          <h1 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Semua Pola Kalimat Bab 1–50
          </h1>

          <p className="mt-4 max-w-3xl leading-7 text-slate-300">
            Kumpulan bunpou dan pola kalimat dari semua bab. Cari pola seperti
            は, が, てもいい, たら, ように, atau cari arti Indonesia seperti
            “kalau”, “harus”, “boleh”, dan lainnya.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-sm text-slate-300">Total Bab</p>
              <p className="mt-1 text-3xl font-bold">{lessons.length}</p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-sm text-slate-300">Total Pola</p>
              <p className="mt-1 text-3xl font-bold">{totalPatterns}</p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-sm text-slate-300">Hasil Tampil</p>
              <p className="mt-1 text-3xl font-bold">{filteredItems.length}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Search className="h-4 w-4" />
                Cari Bunpou
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cari pola, arti, contoh..."
                className="h-12 rounded-2xl"
              />

              <div>
                <p className="mb-2 text-sm font-semibold">Filter Bab</p>
                <div className="grid max-h-[420px] gap-2 overflow-y-auto pr-1">
                  <button
                    type="button"
                    onClick={() => setSelectedLesson("ALL")}
                    className={cn(
                      "rounded-xl border px-3 py-2 text-left text-sm transition",
                      selectedLesson === "ALL"
                        ? "border-slate-950 bg-slate-950 text-white dark:border-white dark:bg-white dark:text-slate-950"
                        : "border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
                    )}
                  >
                    Semua Bab
                  </button>

                  {lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      type="button"
                      onClick={() => setSelectedLesson(lesson.id)}
                      className={cn(
                        "rounded-xl border px-3 py-2 text-left text-sm transition",
                        selectedLesson === lesson.id
                          ? "border-slate-950 bg-slate-950 text-white dark:border-white dark:bg-white dark:text-slate-950"
                          : "border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
                      )}
                    >
                      <span className="font-semibold">Bab {lesson.id}</span>
                      <span className="block truncate text-xs opacity-70">
                        {lesson.subtitle}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        <main className="space-y-4">
          {filteredItems.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Sparkles className="mx-auto h-10 w-10 text-slate-400" />
                <p className="mt-4 font-semibold">Bunpou tidak ditemukan</p>
                <p className="mt-2 text-sm text-slate-500">
                  Coba kata lain seperti “たら”, “harus”, “boleh”, “suka”,
                  atau pilih bab berbeda.
                </p>
              </CardContent>
            </Card>
          )}

          {filteredItems.map((item) => {
            const firstExample = item.grammar.examples[0]

            return (
              <Card key={item.id} className="overflow-hidden">
                <div className="border-l-8 border-l-blue-500">
                  <CardHeader>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="secondary">Bab {item.lessonId}</Badge>
                          <Badge variant="outline">{item.lessonSubtitle}</Badge>
                        </div>

                        <CardTitle className="mt-3 text-xl">
                          {item.grammar.title}
                        </CardTitle>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          {item.grammar.shortExplanation}
                        </p>
                      </div>

                      <Link
                        href={`/lessons/${item.lessonId}`}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
                      >
                        Buka Bab
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-5">
                    <div className="rounded-2xl bg-slate-950 p-4 text-white dark:bg-slate-800">
                      <div className="flex items-start gap-3">
                        <ClipboardList className="mt-1 h-5 w-5 shrink-0 text-blue-300" />
                        <div>
                          <p className="text-sm text-slate-300">Pola</p>
                          <p className="mt-1 font-mono text-lg font-bold">
                            {item.grammar.pattern}
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="leading-7 text-slate-700 dark:text-slate-300">
                      {item.grammar.detailedExplanation}
                    </p>

                    {firstExample && (
                      <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-slate-500">
                              Contoh Kalimat
                            </p>
                            <p className="mt-2 text-lg font-bold">
                              {firstExample.japanese}
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                              {firstExample.romaji}
                            </p>
                            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                              {firstExample.indonesian}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => speakJapanese(firstExample.japanese)}
                            className="rounded-xl p-2 text-slate-500 transition hover:bg-white hover:text-blue-600 dark:hover:bg-slate-900"
                            aria-label="Putar contoh kalimat"
                          >
                            <Volume2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                        <div className="mb-2 flex items-center gap-2 font-semibold">
                          <BookOpen className="h-4 w-4 text-blue-500" />
                          Latihan
                        </div>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                          {item.grammar.practicePrompts.slice(0, 3).map((prompt) => (
                            <li key={prompt}>• {prompt}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-2xl border border-red-100 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/40">
                        <div className="mb-2 flex items-center gap-2 font-semibold text-red-700 dark:text-red-300">
                          <GraduationCap className="h-4 w-4" />
                          Kesalahan Umum
                        </div>
                        <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                          {item.grammar.commonMistakes[0]?.explanation ??
                            "Perhatikan bentuk kata dan partikel agar kalimat tidak terbalik."}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            )
          })}
        </main>
      </section>
    </div>
  )
}
