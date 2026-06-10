export type FlashcardRating = "again" | "hard" | "good" | "easy"

const DAY = 24 * 60 * 60 * 1000

export function getNextReviewDate(rating: FlashcardRating, reviewCount: number) {
  const now = new Date()

  const intervalDays: Record<FlashcardRating, number> = {
    again: 0,
    hard: 1,
    good: Math.max(3, reviewCount * 2),
    easy: Math.max(7, reviewCount * 4)
  }

  return new Date(now.getTime() + intervalDays[rating] * DAY).toISOString()
}

export function isDue(nextReviewAt?: string) {
  if (!nextReviewAt) return true
  return new Date(nextReviewAt).getTime() <= Date.now()
}
