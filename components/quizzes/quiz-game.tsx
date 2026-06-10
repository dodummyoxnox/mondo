"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Trophy,
  XCircle
} from "lucide-react"

import type { Lesson, QuizQuestion } from "@/types"
import { buildQuizQuestions } from "@/lib/quiz"
import { useQuizProgress } from "@/hooks/use-quiz-progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface QuizGameProps {
  lesson: Lesson
}

export function QuizGame({ lesson }: QuizGameProps) {
  const questions = useMemo(() => buildQuizQuestions(lesson, 12), [lesson])
  const { saveResult, getBestResult } = useQuizProgress()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [isChecked, setIsChecked] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const currentQuestion: QuizQuestion | undefined = questions[currentIndex]
  const bestResult = getBestResult(lesson.id)

  const progressValue =
    questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0

  const isCorrect = selectedAnswer === currentQuestion?.answer

  function handleCheck() {
    if (!currentQuestion || !selectedAnswer || isChecked) return

    setIsChecked(true)

    if (selectedAnswer === currentQuestion.answer) {
      setScore((prev) => prev + 1)
    }
  }

  function handleNext() {
    if (currentIndex + 1 >= questions.length) {
      const finalScore = score + (isCorrect ? 1 : 0)
      const percentage = Math.round((finalScore / questions.length) * 100)

      saveResult({
        lessonId: lesson.id,
        score: finalScore,
        total: questions.length,
        percentage
      })

      setFinished(true)
      return
    }

    setCurrentIndex((prev) => prev + 1)
    setSelectedAnswer("")
    setIsChecked(false)
  }

  function restartQuiz() {
    setCurrentIndex(0)
    setSelectedAnswer("")
    setIsChecked(false)
    setScore(0)
    setFinished(false)
  }

  if (!currentQuestion || questions.length === 0) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <Button asChild variant="ghost" className="gap-2">
          <Link href="/quizzes">
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Link>
        </Button>

        <Card>
          <CardContent className="p-8 text-center">
            <HelpCircle className="mx-auto h-12 w-12 text-slate-400" />
            <h1 className="mt-4 text-2xl font-bold">Belum ada soal</h1>
            <p className="mt-2 text-slate-500">
              Data kosakata atau grammar untuk bab ini belum cukup.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100)

    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <Button asChild variant="ghost" className="gap-2">
          <Link href="/quizzes">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke daftar kuis
          </Link>
        </Button>

        <Card className="overflow-hidden">
          <div className="bg-slate-950 p-8 text-center text-white dark:bg-slate-900">
            <Trophy className="mx-auto h-16 w-16 text-yellow-300" />
            <h1 className="mt-4 text-3xl font-bold">Kuis Selesai!</h1>
            <p className="mt-2 text-slate-300">
              {lesson.title}: {lesson.subtitle}
            </p>
          </div>

          <CardContent className="space-y-6 p-8">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-5 text-center dark:bg-slate-950">
                <p className="text-sm text-slate-500">Skor</p>
                <p className="mt-1 text-3xl font-bold">
                  {score}/{questions.length}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5 text-center dark:bg-slate-950">
                <p className="text-sm text-slate-500">Nilai</p>
                <p className="mt-1 text-3xl font-bold">{percentage}%</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5 text-center dark:bg-slate-950">
                <p className="text-sm text-slate-500">Status</p>
                <p className="mt-1 text-2xl font-bold">
                  {percentage >= 80 ? "Lulus" : "Latihan lagi"}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
              <p className="font-semibold">Saran Harmoko Sensei</p>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {percentage >= 80
                  ? "Bagus! Kamu sudah cukup paham. Lanjutkan ke bab berikutnya atau ulangi dengan mode flashcard."
                  : "Tidak apa-apa. Ulangi kosakata yang salah dengan flashcard, lalu coba kuis lagi."}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button className="flex-1 gap-2 rounded-xl" onClick={restartQuiz}>
                <RotateCcw className="h-4 w-4" />
                Ulangi Kuis
              </Button>

              <Button asChild variant="outline" className="flex-1 rounded-xl">
                <Link href={`/flashcards/${lesson.id}`}>Latihan Flashcard</Link>
              </Button>

              <Button asChild variant="secondary" className="flex-1 rounded-xl">
                <Link href={`/lessons/${lesson.id}`}>Buka Materi</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button asChild variant="ghost" className="gap-2">
          <Link href="/quizzes">
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Link>
        </Button>

        {bestResult && (
          <Badge variant="secondary">
            Skor terbaik: {bestResult.percentage}%
          </Badge>
        )}
      </div>

      <div>
        <p className="text-sm text-slate-500">Mode Kuis</p>
        <h1 className="text-3xl font-bold">
          {lesson.title}: {lesson.subtitle}
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Jawab soal kosakata dan tata bahasa. Pilih jawaban terbaik.
        </p>
      </div>

      <Card>
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <Badge variant="outline">
              Soal {currentIndex + 1}/{questions.length}
            </Badge>
            <Badge variant="secondary">Skor: {score}</Badge>
          </div>

          <Progress value={progressValue} />

          <div>
            <CardTitle className="text-xl">{currentQuestion.prompt}</CardTitle>

            {currentQuestion.japanese && (
              <div className="mt-5 rounded-3xl bg-slate-50 p-6 text-center dark:bg-slate-950">
                <p className="text-4xl font-bold">{currentQuestion.japanese}</p>
                {currentQuestion.romaji && (
                  <p className="mt-3 text-slate-500">
                    {currentQuestion.romaji}
                  </p>
                )}
              </div>
            )}

            {currentQuestion.questionText && (
              <div className="mt-5 rounded-3xl bg-slate-50 p-6 text-center dark:bg-slate-950">
                <p className="text-xl font-semibold">
                  {currentQuestion.questionText}
                </p>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="grid gap-3">
            {currentQuestion.options.map((option) => {
              const selected = selectedAnswer === option
              const correct = option === currentQuestion.answer
              const wrongSelected = isChecked && selected && !correct

              return (
                <button
                  key={option}
                  type="button"
                  disabled={isChecked}
                  onClick={() => setSelectedAnswer(option)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 text-left text-sm font-medium transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900",
                    selected && "border-slate-950 ring-2 ring-slate-950 dark:border-white dark:ring-white",
                    isChecked && correct && "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
                    wrongSelected && "border-red-500 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
                  )}
                >
                  <span>{option}</span>

                  {isChecked && correct && (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  )}

                  {wrongSelected && (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </button>
              )
            })}
          </div>

          {isChecked && (
            <div
              className={cn(
                "rounded-2xl border p-4",
                isCorrect
                  ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950"
                  : "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950"
              )}
            >
              <p className="font-semibold">
                {isCorrect ? "Benar!" : "Belum tepat"}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          <div className="flex justify-end">
            {!isChecked ? (
              <Button
                type="button"
                disabled={!selectedAnswer}
                className="rounded-xl"
                onClick={handleCheck}
              >
                Cek Jawaban
              </Button>
            ) : (
              <Button type="button" className="rounded-xl" onClick={handleNext}>
                {currentIndex + 1 >= questions.length
                  ? "Lihat Hasil"
                  : "Soal Berikutnya"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
