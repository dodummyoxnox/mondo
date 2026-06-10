import { notFound } from "next/navigation"

import { getAllLessons, getLessonById } from "@/data/lessons"
import { FlashcardDeck } from "@/components/flashcards/flashcard-deck"

interface FlashcardLessonPageProps {
  params: Promise<{ lessonId: string }>
}

export function generateStaticParams() {
  return getAllLessons().map((lesson) => ({ lessonId: String(lesson.id) }))
}

export default async function FlashcardLessonPage({ params }: FlashcardLessonPageProps) {
  const { lessonId } = await params
  const id = Number(lessonId)
  if (Number.isNaN(id)) notFound()

  const lesson = getLessonById(id)
  if (!lesson) notFound()

  return <FlashcardDeck lesson={lesson} />
}
