"use client"

import { FormEvent, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  CheckCircle2,
  Home,
  RotateCcw,
  Share2,
  Timer,
  Trophy,
  XCircle
} from "lucide-react"

import type { JapaneseQuizDefinition, JapaneseQuizQuestion } from "@/types"
import {
  formatDuration,
  useJapaneseQuizProgress
} from "@/hooks/use-japanese-quiz-progress"
import {
  getQuestionsForQuiz,
  isAnswerCorrect
} from "@/lib/japanese-quiz"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface JapaneseQuizRunnerProps {
  quiz: JapaneseQuizDefinition
}

export function JapaneseQuizRunner({ quiz }: JapaneseQuizRunnerProps) {
  const initialQuestions = useMemo(() => getQuestionsForQuiz(quiz), [quiz])
  const [questions, setQuestions] = useState<JapaneseQuizQuestion[]>(initialQuestions)
  const { saveQuizResult } = useJapaneseQuizProgress()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [typedAnswer, setTypedAnswer] = useState("")
  const [isChecked, setIsChecked] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredTotal, setAnsweredTotal] = useState(0)
  const [finished, setFinished] = useState(false)
  const [durationSeconds, setDurationSeconds] = useState(0)
  const [hasSavedResult, setHasSavedResult] = useState(false)
  const [shareCopied, setShareCopied] = useState(false)

  const startTimeRef = useRef(Date.now())

  const currentQuestion = questions[currentIndex % questions.length]
  const totalForNormalMode = questions.length
  const displayNumber = quiz.unlimited ? answeredTotal + 1 : currentIndex + 1
  const displayTotal = quiz.unlimited ? "∞" : totalForNormalMode
  const progressValue = quiz.unlimited
    ? Math.min(100, (answeredTotal % 10) * 10)
    : ((currentIndex + 1) / totalForNormalMode) * 100

  const userAnswer =
    currentQuestion?.type === "fill-blank" ? typedAnswer : selectedAnswer

  const correct =
    currentQuestion &&
    isAnswerCorrect(
      userAnswer,
      currentQuestion.answer,
      currentQuestion.acceptableAnswers
    )

  useEffect(() => {
    if (!quiz.timed || finished) return

    const timer = window.setInterval(() => {
      setDurationSeconds(Math.floor((Date.now() - startTimeRef.current) / 1000))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [quiz.timed, finished])

  function handleCheck(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault()

    if (!currentQuestion || !userAnswer.trim() || isChecked) return

    setIsChecked(true)

    if (correct) {
      setScore((prev) => prev + 1)
    }
  }

  function resetAnswerState() {
    setSelectedAnswer("")
    setTypedAnswer("")
    setIsChecked(false)
  }

  function goNext() {
    const nextAnsweredTotal = answeredTotal + 1
    setAnsweredTotal(nextAnsweredTotal)

    if (!quiz.unlimited && currentIndex + 1 >= totalForNormalMode) {
      finishQuiz(nextAnsweredTotal)
      return
    }

    if (quiz.unlimited && currentIndex + 1 >= questions.length) {
      setQuestions(getQuestionsForQuiz(quiz))
      setCurrentIndex(0)
    } else {
      setCurrentIndex((prev) => prev + 1)
    }

    resetAnswerState()
  }

  function finishQuiz(totalOverride = answeredTotal) {
    const total = Math.max(1, totalOverride)
    const finalScore = score
    const percentage = Math.round((finalScore / total) * 100)

    setFinished(true)

    if (!hasSavedResult) {
      saveQuizResult({
        quizId: quiz.id,
        quizTitle: quiz.title,
        score: finalScore,
        total,
        percentage,
        durationSeconds: quiz.timed ? durationSeconds : undefined
      })

      setHasSavedResult(true)
    }
  }

  function restartQuiz() {
    startTimeRef.current = Date.now()
    setQuestions(getQuestionsForQuiz(quiz))
    setCurrentIndex(0)
    setSelectedAnswer("")
    setTypedAnswer("")
    setIsChecked(false)
    setScore(0)
    setAnsweredTotal(0)
    setFinished(false)
    setDurationSeconds(0)
    setHasSavedResult(false)
    setShareCopied(false)
  }

  async function shareResult() {
    const total = Math.max(1, answeredTotal)
    const percentage = Math.round((score / total) * 100)
    const text = `Aku baru selesai ${quiz.title} di Mondo! Skor: ${score}/${total} (${percentage}%). Yuk, konsisten bareng belajar bahasa Jepang!`

    const nav = window.navigator as Navigator & {
      share?: (data: ShareData) => Promise<void>
      clipboard?: Clipboard
    }

    try {
      if (typeof nav.share === "function") {
        await nav.share({
          title: "Hasil Kuis Mondo",
          text
        })
        return
      }

      if (nav.clipboard?.writeText) {
        await nav.clipboard.writeText(text)
        setShareCopied(true)
      }
    } catch {
      if (nav.clipboard?.writeText) {
        await nav.clipboard.writeText(text)
        setShareCopied(true)
      }
    }
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
            <h1 className="text-2xl font-bold">Belum ada soal</h1>
            <p className="mt-2 text-slate-500">
              Bank soal untuk mode ini belum tersedia.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (finished) {
    const total = Math.max(1, answeredTotal)
    const percentage = Math.round((score / total) * 100)

    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <Card className="overflow-hidden">
          <div className="bg-slate-950 p-8 text-center text-white dark:bg-slate-900">
            <Trophy className="mx-auto h-16 w-16 text-yellow-300" />
            <h1 className="mt-4 text-3xl font-bold">Otsukaresama, minasan!</h1>
            <p className="mt-2 text-slate-300">
              Kuis selesai. Yuk lihat hasil latihan hari ini.
            </p>
          </div>

          <CardContent className="space-y-6 p-8">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-5 text-center dark:bg-slate-950">
                <p className="text-sm text-slate-500">Skor</p>
                <p className="mt-1 text-3xl font-bold">
                  {score}/{total}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5 text-center dark:bg-slate-950">
                <p className="text-sm text-slate-500">Persentase</p>
                <p className="mt-1 text-3xl font-bold">{percentage}%</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5 text-center dark:bg-slate-950">
                <p className="text-sm text-slate-500">Waktu</p>
                <p className="mt-1 text-3xl font-bold">
                  {quiz.timed ? formatDuration(durationSeconds) : "-"}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
              <p className="font-semibold">Pesan Harmoko Sensei</p>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {percentage >= 80
                  ? "Mantap! Hasilmu bagus. Jangan berhenti di sini, yuk konsisten bareng lagi besok."
                  : "Daijoubu, tidak apa-apa. Ulangi lagi pelan-pelan. Konsisten kecil setiap hari jauh lebih penting."}
              </p>
            </div>

            {shareCopied && (
              <div className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                Hasil kuis sudah disalin. Tinggal paste ke chat atau story.
              </div>
            )}

            <div className="grid gap-3 sm:grid-cols-3">
              <Button className="gap-2 rounded-xl" onClick={restartQuiz}>
                <RotateCcw className="h-4 w-4" />
                Coba Lagi
              </Button>

              <Button asChild variant="outline" className="gap-2 rounded-xl">
                <Link href="/quizzes">
                  <Home className="h-4 w-4" />
                  Menu Kuis
                </Link>
              </Button>

              <Button variant="secondary" className="gap-2 rounded-xl" onClick={shareResult}>
                <Share2 className="h-4 w-4" />
                Bagikan Hasil
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

        <div className="flex flex-wrap items-center gap-2">
          {quiz.timed && (
            <Badge className="gap-1">
              <Timer className="h-3.5 w-3.5" />
              {formatDuration(durationSeconds)}
            </Badge>
          )}

          {quiz.unlimited && (
            <Button variant="outline" className="rounded-xl" onClick={() => finishQuiz(answeredTotal)}>
              Selesai
            </Button>
          )}
        </div>
      </div>

      <div>
        <p className="text-sm text-slate-500">Sistem Kuis Bahasa Jepang</p>
        <h1 className="text-3xl font-bold">{quiz.title}</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          {quiz.description}
        </p>
      </div>

      <Card>
        <CardHeader className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge variant="secondary">
              Soal {displayNumber}/{displayTotal}
            </Badge>

            <Badge variant="outline">
              Benar: {score}
            </Badge>
          </div>

          <Progress value={progressValue} />

          <div>
            <CardTitle className="text-xl">{currentQuestion.prompt}</CardTitle>

            <div className="mt-5 rounded-3xl bg-slate-50 p-6 text-center dark:bg-slate-950">
              <p className="text-lg font-semibold text-slate-500 dark:text-slate-400">
                {currentQuestion.question}
              </p>

              {currentQuestion.japanese && (
                <p className="mt-4 text-4xl font-bold">
                  {currentQuestion.japanese}
                </p>
              )}

              {currentQuestion.romaji && (
                <p className="mt-3 text-slate-500">{currentQuestion.romaji}</p>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {currentQuestion.type === "multiple-choice" && (
            <div className="grid gap-3">
              {(currentQuestion.options ?? []).map((option) => {
                const selected = selectedAnswer === option
                const optionCorrect = isAnswerCorrect(
                  option,
                  currentQuestion.answer,
                  currentQuestion.acceptableAnswers
                )
                const wrongSelected = isChecked && selected && !optionCorrect

                return (
                  <button
                    key={option}
                    type="button"
                    disabled={isChecked}
                    onClick={() => setSelectedAnswer(option)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 text-left text-sm font-medium transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900",
                      selected && "border-slate-950 ring-2 ring-slate-950 dark:border-white dark:ring-white",
                      isChecked && optionCorrect && "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
                      wrongSelected && "border-red-500 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
                    )}
                  >
                    <span>{option}</span>

                    {isChecked && optionCorrect && (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    )}

                    {wrongSelected && (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </button>
                )
              })}
            </div>
          )}

          {currentQuestion.type === "fill-blank" && (
            <form onSubmit={handleCheck} className="space-y-3">
              <Input
                value={typedAnswer}
                disabled={isChecked}
                onChange={(event) => setTypedAnswer(event.target.value)}
                placeholder="Ketik jawaban di sini..."
                className="h-14 rounded-2xl text-base"
              />

              {!isChecked && (
                <p className="text-xs text-slate-500">
                  Tips: boleh isi hiragana/katakana/romaji kalau termasuk jawaban yang diterima.
                </p>
              )}
            </form>
          )}

          {isChecked && (
            <div
              className={cn(
                "rounded-2xl border p-4",
                correct
                  ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950"
                  : "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950"
              )}
            >
              <p className="font-semibold">
                {correct ? "Benar, sugoi!" : "Belum tepat, yuk coba pahami lagi"}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                {currentQuestion.explanation}
              </p>
              {!correct && (
                <p className="mt-2 text-sm font-semibold">
                  Jawaban benar: {currentQuestion.answer}
                </p>
              )}
            </div>
          )}

          <div className="flex justify-end">
            {!isChecked ? (
              <Button
                type="button"
                disabled={!userAnswer.trim()}
                className="rounded-xl"
                onClick={() => handleCheck()}
              >
                Cek Jawaban
              </Button>
            ) : (
              <Button type="button" className="rounded-xl" onClick={goNext}>
                {quiz.unlimited
                  ? "Soal Berikutnya"
                  : currentIndex + 1 >= totalForNormalMode
                    ? "Lihat Hasil"
                    : "Lanjut"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
