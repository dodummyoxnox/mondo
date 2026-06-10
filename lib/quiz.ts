import type { Lesson, QuizQuestion, VocabularyItem } from "@/types"

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5)
}

function unique(items: string[]) {
  return Array.from(new Set(items.filter(Boolean)))
}

function makeOptions(correct: string, pool: string[], count = 4) {
  const wrongOptions = shuffle(unique(pool).filter((item) => item !== correct))
  return shuffle(unique([correct, ...wrongOptions]).slice(0, count))
}

function buildVocabularyQuestions(lesson: Lesson): QuizQuestion[] {
  const meanings = lesson.vocabulary.map((item) => item.indonesian)
  const japaneseWords = lesson.vocabulary.map((item) => item.kana)

  return lesson.vocabulary.flatMap((item: VocabularyItem, index) => {
    const jpToId: QuizQuestion = {
      id: `l${lesson.id}-v${index + 1}-jp-id`,
      lessonId: lesson.id,
      type: "jp-to-id",
      prompt: "Apa arti kosakata ini?",
      japanese: item.kana,
      romaji: item.romaji,
      answer: item.indonesian,
      options: makeOptions(item.indonesian, meanings),
      explanation: `${item.kana} (${item.romaji}) berarti ${item.indonesian}.`
    }

    const idToJp: QuizQuestion = {
      id: `l${lesson.id}-v${index + 1}-id-jp`,
      lessonId: lesson.id,
      type: "id-to-jp",
      prompt: "Pilih bahasa Jepang yang benar.",
      questionText: item.indonesian,
      answer: item.kana,
      options: makeOptions(item.kana, japaneseWords),
      explanation: `${item.indonesian} dalam bahasa Jepang adalah ${item.kana} (${item.romaji}).`
    }

    return [jpToId, idToJp]
  })
}

function buildGrammarQuestions(lesson: Lesson): QuizQuestion[] {
  const patterns = lesson.grammar.map((grammar) => grammar.pattern)

  return lesson.grammar.flatMap((grammar, index) => {
    const patternQuestion: QuizQuestion = {
      id: `l${lesson.id}-g${index + 1}-pattern`,
      lessonId: lesson.id,
      type: "grammar-pattern",
      prompt: "Pilih pola grammar yang sesuai dengan penjelasan ini.",
      questionText: grammar.shortExplanation,
      answer: grammar.pattern,
      options: makeOptions(grammar.pattern, patterns),
      explanation: grammar.detailedExplanation
    }

    const example = grammar.examples[0]

    if (!example) return [patternQuestion]

    const exampleQuestion: QuizQuestion = {
      id: `l${lesson.id}-g${index + 1}-example`,
      lessonId: lesson.id,
      type: "example-meaning",
      prompt: "Apa arti kalimat ini?",
      japanese: example.japanese,
      romaji: example.romaji,
      answer: example.indonesian,
      options: makeOptions(
        example.indonesian,
        lesson.grammar.flatMap((item) =>
          item.examples.map((exampleItem) => exampleItem.indonesian)
        )
      ),
      explanation: `${example.japanese} berarti ${example.indonesian}`
    }

    return [patternQuestion, exampleQuestion]
  })
}

export function buildQuizQuestions(lesson: Lesson, limit = 12): QuizQuestion[] {
  const questions = [
    ...buildVocabularyQuestions(lesson),
    ...buildGrammarQuestions(lesson)
  ]

  return shuffle(questions).slice(0, Math.min(limit, questions.length))
}
