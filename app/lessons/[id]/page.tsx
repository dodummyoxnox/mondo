import { notFound } from "next/navigation"
import { ArrowLeft, BookOpen, Clock, Sparkles } from "lucide-react"
import Link from "next/link"

import { getAllLessons, getLessonById } from "@/data/lessons"
import { LessonDetailTabs } from "@/components/lessons/lesson-detail-tabs"
import { LessonProgressButton } from "@/components/lessons/lesson-progress-button"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface LessonPageProps {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return getAllLessons().map((lesson) => ({ id: String(lesson.id) }))
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { id } = await params
  const lessonId = Number(id)
  if (Number.isNaN(lessonId)) notFound()

  const lesson = getLessonById(lessonId)
  if (!lesson) notFound()

  return (
    <div className="space-y-6">
      <div>
        <Button asChild variant="ghost" className="mb-4 gap-2">
          <Link href="/"><ArrowLeft className="h-4 w-4" />Kembali ke Dashboard</Link>
        </Button>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="bg-slate-950 px-6 py-8 text-white dark:bg-slate-900 sm:px-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-white text-slate-950 hover:bg-white">{lesson.title}</Badge>
              <Badge variant="outline" className="border-white/20 text-white">{lesson.estimatedMinutes} menit</Badge>
            </div>

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{lesson.subtitle}</h1>
                <p className="mt-3 text-base leading-7 text-slate-300">{lesson.theme}</p>
              </div>
              <LessonProgressButton lessonId={lesson.id} />
            </div>
          </div>

          <div className="grid gap-4 p-6 sm:grid-cols-3 sm:p-8">
            <Card><CardContent className="flex items-center gap-4 p-4"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800"><BookOpen className="h-5 w-5 text-slate-700 dark:text-slate-200" /></div><div><p className="text-sm text-slate-500">Kosakata</p><p className="text-xl font-bold">{lesson.vocabulary.length}</p></div></CardContent></Card>
            <Card><CardContent className="flex items-center gap-4 p-4"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800"><Sparkles className="h-5 w-5 text-slate-700 dark:text-slate-200" /></div><div><p className="text-sm text-slate-500">Tata Bahasa</p><p className="text-xl font-bold">{lesson.grammar.length}</p></div></CardContent></Card>
            <Card><CardContent className="flex items-center gap-4 p-4"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800"><Clock className="h-5 w-5 text-slate-700 dark:text-slate-200" /></div><div><p className="text-sm text-slate-500">Estimasi</p><p className="text-xl font-bold">{lesson.estimatedMinutes}m</p></div></CardContent></Card>
          </div>
        </div>
      </div>

      <LessonDetailTabs lesson={lesson} />
    </div>
  )
}
