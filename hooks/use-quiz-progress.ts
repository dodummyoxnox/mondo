"use client"

import { useLocalStorage } from "@/hooks/use-local-storage"
import type { QuizResult } from "@/types"

const QUIZ_STORAGE_KEY = "minna-quiz-results"

export function useQuizProgress() {
  const [results, setResults, isLoaded] = useLocalStorage<QuizResult[]>(
    QUIZ_STORAGE_KEY,
    []
  )

  function saveResult(result: Omit<QuizResult, "id" | "createdAt">) {
    const nextResult: QuizResult = {
      ...result,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    }

    setResults((prev) => [nextResult, ...prev].slice(0, 100))
  }

  function getBestResult(lessonId: number) {
    return results
      .filter((result) => result.lessonId === lessonId)
      .sort((a, b) => b.percentage - a.percentage)[0]
  }

  function getLatestResult(lessonId: number) {
    return results.find((result) => result.lessonId === lessonId)
  }

  return {
    results,
    isLoaded,
    saveResult,
    getBestResult,
    getLatestResult
  }
}
