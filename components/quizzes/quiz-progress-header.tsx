"use client"

import { Flame, Medal, Trophy } from "lucide-react"

import { useJapaneseQuizProgress } from "@/hooks/use-japanese-quiz-progress"
import { Card, CardContent } from "@/components/ui/card"

export function QuizProgressHeader() {
  const { progress } = useJapaneseQuizProgress()

  return (
    <div className="grid gap-3 md:grid-cols-3">
      <Card className="overflow-hidden">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
            <Medal className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Level minasan</p>
            <p className="text-2xl font-bold">Level {progress.level}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-white">
            <Flame className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Streak harian</p>
            <p className="text-2xl font-bold">
              {progress.streak} hari berturut-turut
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white">
            <Trophy className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Kuis hari ini</p>
            <p className="text-2xl font-bold">
              {progress.quizzesCompletedToday} selesai
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
