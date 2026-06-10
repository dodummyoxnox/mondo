import { notFound } from "next/navigation"

import {
  getAllQuizDefinitions,
  getQuizDefinitionById
} from "@/data/quizzes/quizzes"
import { JapaneseQuizRunner } from "@/components/quizzes/japanese-quiz-runner"

interface QuizPageProps {
  params: Promise<{
    quizId: string
  }>
}

export function generateStaticParams() {
  return getAllQuizDefinitions().map((quiz) => ({
    quizId: quiz.id
  }))
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { quizId } = await params
  const quiz = getQuizDefinitionById(quizId)

  if (!quiz) notFound()

  return <JapaneseQuizRunner quiz={quiz} />
}
