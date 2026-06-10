import Link from "next/link"
import { Brain, ChevronRight } from "lucide-react"

import { getAllLessons } from "@/data/lessons"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function FlashcardsPage() {
  const lessons = getAllLessons()

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-slate-500">Mode Hafalan</p>
        <h1 className="text-3xl font-bold">Flashcard Kosakata</h1>
        <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">Pilih pelajaran, hafalkan kosakata, lalu nilai ingatanmu. Progress tersimpan otomatis di localStorage.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {lessons.map((lesson) => (
          <Link key={lesson.id} href={`/flashcards/${lesson.id}`}>
            <Card className="h-full transition hover:-translate-y-1 hover:shadow-md">
              <CardContent className="flex h-full items-center justify-between gap-4 p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                    <Brain className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Lesson {lesson.id}</Badge>
                      <Badge variant="outline">{lesson.vocabulary.length} kata</Badge>
                    </div>
                    <h2 className="mt-3 font-bold">{lesson.subtitle}</h2>
                    <p className="mt-1 text-sm text-slate-500">{lesson.theme}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
