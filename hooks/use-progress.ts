"use client"

import type { FlashcardProgress, LessonProgress, LessonTab, UserProgress } from "@/types"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { STORAGE_KEYS } from "@/lib/storage-keys"
import { getNextReviewDate, type FlashcardRating } from "@/lib/spaced-repetition"

const defaultProgress: UserProgress = {
  completedLessons: [],
  streak: 0,
  totalWordsReviewed: 0,
  lessonProgress: {},
  flashcards: {}
}

function createLessonProgress(lessonId: number): LessonProgress {
  return {
    lessonId,
    completedTabs: [],
    isCompleted: false,
    vocabularyMastered: 0,
    grammarMastered: 0,
    lastOpenedAt: new Date().toISOString()
  }
}

export function useProgress() {
  const [progress, setProgress, isLoaded] = useLocalStorage<UserProgress>(
    STORAGE_KEYS.progress,
    defaultProgress
  )

  function touchLesson(lessonId: number) {
    setProgress((prev) => ({
      ...prev,
      lastStudiedLessonId: lessonId,
      lessonProgress: {
        ...prev.lessonProgress,
        [lessonId]: {
          ...(prev.lessonProgress[lessonId] ?? createLessonProgress(lessonId)),
          lastOpenedAt: new Date().toISOString()
        }
      }
    }))
  }

  function toggleLessonCompleted(lessonId: number) {
    setProgress((prev) => {
      const completed = prev.completedLessons.includes(lessonId)
      const currentLesson = prev.lessonProgress[lessonId] ?? createLessonProgress(lessonId)

      return {
        ...prev,
        completedLessons: completed
          ? prev.completedLessons.filter((id) => id !== lessonId)
          : [...prev.completedLessons, lessonId],
        lessonProgress: {
          ...prev.lessonProgress,
          [lessonId]: {
            ...currentLesson,
            isCompleted: !completed,
            lastOpenedAt: new Date().toISOString()
          }
        }
      }
    })
  }

  function toggleTabCompleted(lessonId: number, tab: LessonTab) {
    setProgress((prev) => {
      const currentLesson = prev.lessonProgress[lessonId] ?? createLessonProgress(lessonId)
      const exists = currentLesson.completedTabs.includes(tab)

      return {
        ...prev,
        lessonProgress: {
          ...prev.lessonProgress,
          [lessonId]: {
            ...currentLesson,
            completedTabs: exists
              ? currentLesson.completedTabs.filter((item) => item !== tab)
              : [...currentLesson.completedTabs, tab],
            lastOpenedAt: new Date().toISOString()
          }
        }
      }
    })
  }

  function reviewFlashcard(lessonId: number, itemId: string, rating: FlashcardRating) {
    setProgress((prev) => {
      const currentCard: FlashcardProgress = prev.flashcards[itemId] ?? {
        itemId,
        lessonId,
        ease: rating,
        reviewCount: 0
      }

      const reviewCount = currentCard.reviewCount + 1

      const nextCard: FlashcardProgress = {
        ...currentCard,
        ease: rating,
        reviewCount,
        lastReviewedAt: new Date().toISOString(),
        nextReviewAt: getNextReviewDate(rating, reviewCount)
      }

      const nextFlashcards = {
        ...prev.flashcards,
        [itemId]: nextCard
      }

      const lessonCards = Object.values(nextFlashcards).filter((card) => card.lessonId === lessonId)
      const masteredCount = lessonCards.filter((card) => card.ease === "good" || card.ease === "easy").length
      const currentLesson = prev.lessonProgress[lessonId] ?? createLessonProgress(lessonId)

      return {
        ...prev,
        totalWordsReviewed: prev.totalWordsReviewed + 1,
        flashcards: nextFlashcards,
        lessonProgress: {
          ...prev.lessonProgress,
          [lessonId]: {
            ...currentLesson,
            vocabularyMastered: masteredCount,
            lastOpenedAt: new Date().toISOString()
          }
        }
      }
    })
  }

  return {
    progress,
    isLoaded,
    touchLesson,
    toggleLessonCompleted,
    toggleTabCompleted,
    reviewFlashcard
  }
}
