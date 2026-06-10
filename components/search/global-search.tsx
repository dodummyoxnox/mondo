"use client"

import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { BookOpen, Search, Sparkles } from "lucide-react"

import type { Lesson } from "@/types"
import { searchLessons } from "@/lib/search"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface GlobalSearchProps {
  lessons: Lesson[]
}

const typeLabel = {
  lesson: "Pelajaran",
  vocabulary: "Kosakata",
  grammar: "Grammar",
  conversation: "Percakapan",
  culture: "Info Jepang"
}

export function GlobalSearch({ lessons }: GlobalSearchProps) {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") ?? "")
  const results = useMemo(() => searchLessons(lessons, query), [lessons, query])

  return (
    <div className="space-y-5">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari kosakata, grammar, contoh: これ, は, pergi, buku..." className="h-14 rounded-2xl pl-12 text-base" autoFocus />
      </div>

      {!query && (
        <Card>
          <CardContent className="p-6 text-center">
            <Sparkles className="mx-auto h-10 w-10 text-slate-400" />
            <h2 className="mt-3 text-xl font-bold">Cari dari semua pelajaran</h2>
            <p className="mt-2 text-sm text-slate-500">Search bisa mencari kosakata, romaji, arti Indonesia, dan pola grammar.</p>
          </CardContent>
        </Card>
      )}

      {query && results.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="font-semibold">Tidak ada hasil</p>
            <p className="mt-1 text-sm text-slate-500">Coba kata lain seperti “buku”, “kore”, “ikimasu”, atau “partikel”.</p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {results.map((result) => (
          <Link key={`${result.type}-${result.id}`} href={result.href}>
            <Card className="transition hover:bg-slate-50 dark:hover:bg-slate-800">
              <CardContent className="flex items-start gap-4 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{typeLabel[result.type]}</Badge>
                    {result.lessonId && <Badge variant="outline">Pelajaran {result.lessonId}</Badge>}
                  </div>
                  <h3 className="mt-2 font-bold">{result.title}</h3>
                  {result.subtitle && <p className="mt-1 text-sm text-slate-500">{result.subtitle}</p>}
                  {result.matchedText && <p className="mt-2 text-xs text-slate-400">Cocok: {result.matchedText}</p>}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
