export type LessonLevel = "beginner" | "elementary" | "intermediate"

export type LessonTab = "vocabulary" | "grammar" | "conversation" | "culture"

export type PartOfSpeech =
  | "noun"
  | "verb"
  | "i-adjective"
  | "na-adjective"
  | "adverb"
  | "particle"
  | "expression"
  | "question-word"
  | "prefix"
  | "suffix"

export interface ExampleSentence {
  id: string
  japanese: string
  romaji: string
  indonesian: string
  notes?: string
}

export interface VocabularyItem {
  id: string
  lessonId: number
  kana: string
  kanji?: string
  romaji: string
  indonesian: string
  partOfSpeech: PartOfSpeech
  tags: string[]
  audioText?: string
  examples: ExampleSentence[]
}

export interface GrammarStructure {
  id: string
  label: string
  pattern: string
  meaning: string
}

export interface CommonMistake {
  id: string
  wrong: string
  correct: string
  explanation: string
}

export interface GrammarPoint {
  id: string
  lessonId: number
  title: string
  pattern: string
  shortExplanation: string
  detailedExplanation: string
  structures: GrammarStructure[]
  examples: ExampleSentence[]
  commonMistakes: CommonMistake[]
  practicePrompts: string[]
}

export interface ConversationLine {
  id: string
  speaker: string
  japanese: string
  romaji: string
  indonesian: string
}

export interface Conversation {
  id: string
  lessonId: number
  title: string
  context: string
  lines: ConversationLine[]
  roleplayPrompts: string[]
}

export interface CultureNote {
  id: string
  lessonId: number
  title: string
  body: string
  tips: string[]
}

export interface Lesson {
  id: number
  slug: string
  title: string
  subtitle: string
  theme: string
  level: LessonLevel
  estimatedMinutes: number
  canDo: string[]
  vocabulary: VocabularyItem[]
  grammar: GrammarPoint[]
  conversations: Conversation[]
  cultureNotes: CultureNote[]
  aiSuggestedPrompts: string[]
}

export interface FlashcardProgress {
  itemId: string
  lessonId: number
  ease: "again" | "hard" | "good" | "easy"
  reviewCount: number
  lastReviewedAt?: string
  nextReviewAt?: string
}

export interface LessonProgress {
  lessonId: number
  completedTabs: LessonTab[]
  isCompleted: boolean
  vocabularyMastered: number
  grammarMastered: number
  lastOpenedAt?: string
}

export interface UserProgress {
  completedLessons: number[]
  lastStudiedLessonId?: number
  streak: number
  totalWordsReviewed: number
  lessonProgress: Record<number, LessonProgress>
  flashcards: Record<string, FlashcardProgress>
}

export interface SearchResult {
  id: string
  type: "lesson" | "vocabulary" | "grammar" | "conversation" | "culture"
  lessonId?: number
  title: string
  subtitle?: string
  href: string
  matchedText?: string
}

export interface AIChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  createdAt: string
}


export type QuizQuestionType =
  | "jp-to-id"
  | "id-to-jp"
  | "grammar-pattern"
  | "example-meaning"

export interface QuizQuestion {
  id: string
  lessonId: number
  type: QuizQuestionType
  prompt: string
  questionText?: string
  japanese?: string
  romaji?: string
  answer: string
  options: string[]
  explanation: string
}

export interface QuizResult {
  id: string
  lessonId: number
  score: number
  total: number
  percentage: number
  createdAt: string
}


export type JapaneseQuizQuestionType = "multiple-choice" | "fill-blank"

export type JapaneseQuizCategory =
  | "mixed"
  | "kotoba"
  | "bunpou"
  | "kanji"
  | "kana"
  | "particle"
  | "verb"
  | "adjective"

export type JapaneseQuizLevel = "N5" | "N4"

export interface JapaneseQuizQuestion {
  id: string
  level: JapaneseQuizLevel
  category: JapaneseQuizCategory
  type: JapaneseQuizQuestionType
  prompt: string
  question: string
  japanese?: string
  romaji?: string
  answer: string
  acceptableAnswers?: string[]
  options?: string[]
  explanation: string
  tags: string[]
}

export type JapaneseQuizKind = "daily" | "ability"

export interface JapaneseQuizDefinition {
  id: string
  title: string
  subtitle: string
  description: string
  kind: JapaneseQuizKind
  category: JapaneseQuizCategory
  level: JapaneseQuizLevel | "N5-N4"
  totalQuestions: number | null
  timed: boolean
  unlimited: boolean
  icon: string
  color: string
  tags: string[]
}

export interface JapaneseQuizResult {
  id: string
  quizId: string
  quizTitle: string
  score: number
  total: number
  percentage: number
  durationSeconds?: number
  createdAt: string
}

export interface JapaneseQuizUserProgress {
  level: number
  xp: number
  streak: number
  lastQuizDate?: string
  quizzesCompletedToday: number
  totalQuizzesCompleted: number
  results: JapaneseQuizResult[]
}
