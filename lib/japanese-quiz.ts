import questionBank from "@/data/quizzes/question-bank.json"
import type {
  JapaneseQuizCategory,
  JapaneseQuizDefinition,
  JapaneseQuizLevel,
  JapaneseQuizQuestion
} from "@/types"

const questions = questionBank as JapaneseQuizQuestion[]

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5)
}

function matchesLevel(
  questionLevel: JapaneseQuizLevel,
  quizLevel: JapaneseQuizDefinition["level"]
) {
  if (quizLevel === "N5-N4") return true
  return questionLevel === quizLevel
}

function matchesCategory(
  questionCategory: JapaneseQuizCategory,
  quizCategory: JapaneseQuizCategory,
  questionTags: string[]
) {
  if (quizCategory === "mixed") return true
  if (questionCategory === quizCategory) return true

  if (quizCategory === "bunpou") {
    return questionTags.includes("bunpou") || questionTags.includes("grammar")
  }

  if (quizCategory === "kotoba") {
    return questionTags.includes("kotoba")
  }

  return false
}

function matchesTags(question: JapaneseQuizQuestion, quiz: JapaneseQuizDefinition) {
  if (quiz.tags.includes("fill-blank")) {
    return question.type === "fill-blank"
  }

  return true
}

export function getQuestionsForQuiz(quiz: JapaneseQuizDefinition) {
  const filtered = questions.filter((question) => {
    return (
      matchesLevel(question.level, quiz.level) &&
      matchesCategory(question.category, quiz.category, question.tags) &&
      matchesTags(question, quiz)
    )
  })

  const fallback = filtered.length >= 4 ? filtered : questions
  const shuffled = shuffle(fallback)

  if (quiz.unlimited || quiz.totalQuestions === null) {
    return shuffled
  }

  return shuffled.slice(0, Math.min(quiz.totalQuestions, shuffled.length))
}

export function normalizeAnswer(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[。！？!?.,、]/g, "")
}

export function isAnswerCorrect(userAnswer: string, correctAnswer: string, acceptableAnswers?: string[]) {
  const normalizedUser = normalizeAnswer(userAnswer)
  const answers = [correctAnswer, ...(acceptableAnswers ?? [])].map(normalizeAnswer)

  return answers.includes(normalizedUser)
}
