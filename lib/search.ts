import type { Lesson, SearchResult } from "@/types"

export function searchLessons(lessons: Lesson[], query: string): SearchResult[] {
  const keyword = query.trim().toLowerCase()
  if (!keyword) return []

  const results: SearchResult[] = []

  for (const lesson of lessons) {
    const lessonText = [lesson.title, lesson.subtitle, lesson.theme, ...lesson.canDo]
      .join(" ")
      .toLowerCase()

    if (lessonText.includes(keyword)) {
      results.push({
        id: `lesson-${lesson.id}`,
        type: "lesson",
        lessonId: lesson.id,
        title: `${lesson.title}: ${lesson.subtitle}`,
        subtitle: lesson.theme,
        href: `/lessons/${lesson.id}`,
        matchedText: lesson.theme
      })
    }

    for (const word of lesson.vocabulary) {
      const text = [word.kana, word.kanji, word.romaji, word.indonesian, word.partOfSpeech, ...word.tags]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()

      if (text.includes(keyword)) {
        results.push({
          id: word.id,
          type: "vocabulary",
          lessonId: lesson.id,
          title: `${word.kana}${word.kanji ? `（${word.kanji}）` : ""}`,
          subtitle: `${word.romaji} · ${word.indonesian}`,
          href: `/lessons/${lesson.id}`,
          matchedText: word.indonesian
        })
      }
    }

    for (const grammar of lesson.grammar) {
      const text = [
        grammar.title,
        grammar.pattern,
        grammar.shortExplanation,
        grammar.detailedExplanation,
        ...grammar.practicePrompts
      ]
        .join(" ")
        .toLowerCase()

      if (text.includes(keyword)) {
        results.push({
          id: grammar.id,
          type: "grammar",
          lessonId: lesson.id,
          title: grammar.title,
          subtitle: grammar.shortExplanation,
          href: `/lessons/${lesson.id}`,
          matchedText: grammar.pattern
        })
      }
    }
  }

  return results.slice(0, 50)
}
