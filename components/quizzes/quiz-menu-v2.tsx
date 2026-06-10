"use client"

import Link from "next/link"
import {
  BookOpen,
  Brain,
  ChevronRight,
  Flame,
  Infinity,
  PenLine,
  Sparkles,
  Timer,
  Trophy
} from "lucide-react"

import {
  abilityTests,
  dailyQuizzes
} from "@/data/quizzes/quizzes"
import { QuizProgressHeader } from "@/components/quizzes/quiz-progress-header"
import { useJapaneseQuizProgress } from "@/hooks/use-japanese-quiz-progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

function iconFor(name: string) {
  if (name === "book") return BookOpen
  if (name === "brain") return Brain
  if (name === "trophy") return Trophy
  if (name === "clock") return Timer
  if (name === "pen") return PenLine
  if (name === "heart") return Flame
  return Sparkles
}

export function QuizMenuV2() {
  const { getBestResult } = useJapaneseQuizProgress()

  return (
    <div className="space-y-8">
      <QuizProgressHeader />

      <section className="overflow-hidden rounded-3xl bg-slate-950 p-6 text-white dark:bg-slate-900 sm:p-8">
        <Badge className="bg-white text-slate-950 hover:bg-white">
          Kuis Bahasa Jepang
        </Badge>

        <h1 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
          Mau latihan apa hari ini?
        </h1>

        <p className="mt-4 max-w-3xl leading-7 text-slate-300">
          Yuk, konsisten bareng! Kuis ini dirancang untuk nemenin minasan
          memperdalam huruf hingga tata bahasa Jepang dengan cara yang lebih
          menyenangkan dan terstruktur.
        </p>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Kuis Harian</h2>
          <p className="mt-1 text-sm text-slate-500">
            Pilih 1 kuis pendek buat jaga ritme belajar hari ini.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {dailyQuizzes.map((quiz) => {
            const Icon = iconFor(quiz.icon)
            const best = getBestResult(quiz.id)

            return (
              <Link key={quiz.id} href={`/quizzes/${quiz.id}`}>
                <Card className="h-full overflow-hidden transition hover:-translate-y-1 hover:shadow-md">
                  <div className={`h-2 bg-gradient-to-r ${quiz.color}`} />

                  <CardContent className="flex h-full items-start gap-4 p-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary">{quiz.level}</Badge>
                        <Badge variant="outline">
                          {quiz.totalQuestions} soal
                        </Badge>
                        {best && (
                          <Badge variant="success">Best {best.percentage}%</Badge>
                        )}
                      </div>

                      <h3 className="mt-3 font-bold">{quiz.title}</h3>
                      <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">
                        {quiz.subtitle}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                        {quiz.description}
                      </p>
                    </div>

                    <ChevronRight className="mt-1 h-5 w-5 text-slate-400" />
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Tes Kemampuan</h2>
          <p className="mt-1 text-sm text-slate-500">
            Mode lebih serius buat mengukur kemampuan minasan.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {abilityTests.map((quiz) => {
            const Icon = iconFor(quiz.icon)
            const best = getBestResult(quiz.id)

            return (
              <Link key={quiz.id} href={`/quizzes/${quiz.id}`}>
                <Card className="h-full overflow-hidden transition hover:-translate-y-1 hover:shadow-md">
                  <div className={`h-2 bg-gradient-to-r ${quiz.color}`} />

                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                        <Icon className="h-6 w-6" />
                      </div>

                      {quiz.unlimited ? (
                        <Badge className="gap-1">
                          <Infinity className="h-3.5 w-3.5" />
                          Tanpa batas
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          {quiz.totalQuestions} soal
                        </Badge>
                      )}
                    </div>

                    <h3 className="mt-5 text-xl font-bold">{quiz.title}</h3>
                    <p className="mt-1 font-medium text-slate-600 dark:text-slate-300">
                      {quiz.subtitle}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {quiz.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <Badge variant="outline">{quiz.level}</Badge>
                      {quiz.timed && (
                        <Badge variant="outline" className="gap-1">
                          <Timer className="h-3.5 w-3.5" />
                          Stopwatch
                        </Badge>
                      )}
                      {best && (
                        <Badge variant="success">Best {best.percentage}%</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
