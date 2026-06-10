"use client"

import { useLocalStorage } from "@/hooks/use-local-storage"
import type {
  JapaneseQuizResult,
  JapaneseQuizUserProgress
} from "@/types"

const QUIZ_PROGRESS_KEY = "minna-japanese-quiz-progress-v2"

const defaultProgress: JapaneseQuizUserProgress = {
  level: 1,
  xp: 0,
  streak: 0,
  quizzesCompletedToday: 0,
  totalQuizzesCompleted: 0,
  results: []
}

function getTodayKey() {
  return new Date().toISOString().slice(0, 10)
}

function getYesterdayKey() {
  const date = new Date()
  date.setDate(date.getDate() - 1)
  return date.toISOString().slice(0, 10)
}

function calculateLevel(xp: number) {
  return Math.floor(xp / 200) + 1
}

export function formatDuration(seconds?: number) {
  if (!seconds) return "00:00"

  const minutes = Math.floor(seconds / 60)
  const restSeconds = seconds % 60

  return `${String(minutes).padStart(2, "0")}:${String(restSeconds).padStart(2, "0")}`
}

export function useJapaneseQuizProgress() {
  const [progress, setProgress, isLoaded] =
    useLocalStorage<JapaneseQuizUserProgress>(
      QUIZ_PROGRESS_KEY,
      defaultProgress
    )

  function saveQuizResult(
    result: Omit<JapaneseQuizResult, "id" | "createdAt">
  ) {
    setProgress((prev) => {
      const today = getTodayKey()
      const yesterday = getYesterdayKey()
      const isFirstQuizToday = prev.lastQuizDate !== today

      const nextStreak = !isFirstQuizToday
        ? prev.streak
        : prev.lastQuizDate === yesterday
          ? prev.streak + 1
          : 1

      const nextQuizzesToday = isFirstQuizToday
        ? 1
        : prev.quizzesCompletedToday + 1

      const xpGain = Math.max(10, Math.round(result.percentage / 2))
      const nextXp = prev.xp + xpGain

      const newResult: JapaneseQuizResult = {
        ...result,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString()
      }

      return {
        ...prev,
        xp: nextXp,
        level: calculateLevel(nextXp),
        streak: nextStreak,
        lastQuizDate: today,
        quizzesCompletedToday: nextQuizzesToday,
        totalQuizzesCompleted: prev.totalQuizzesCompleted + 1,
        results: [newResult, ...prev.results].slice(0, 100)
      }
    })
  }

  function getBestResult(quizId: string) {
    return progress.results
      .filter((result) => result.quizId === quizId)
      .sort((a, b) => b.percentage - a.percentage)[0]
  }

  return {
    progress,
    isLoaded,
    saveQuizResult,
    getBestResult
  }
}
