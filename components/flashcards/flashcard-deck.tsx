"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, RotateCcw } from "lucide-react"

import type { Lesson, VocabularyItem } from "@/types"
import { Flashcard } from "@/components/flashcards/flashcard"
import { useProgress } from "@/hooks/use-progress"
import { isDue } from "@/lib/spaced-repetition"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface FlashcardDeckProps {
  lesson: Lesson
}

export function FlashcardDeck({ lesson }: FlashcardDeckProps) {
  const { progress, reviewFlashcard } = useProgress()
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [onlyDue, setOnlyDue] = useState(false)

  const cards = useMemo(() => {
    if (!onlyDue) return lesson.vocabulary
    return lesson.vocabulary.filter((item) => {
      const card = progress.flashcards[item.id]
      return isDue(card?.nextReviewAt)
    })
  }, [lesson.vocabulary, onlyDue, progress.flashcards])

  const currentCard: VocabularyItem | undefined = cards[index]
  const reviewed = lesson.vocabulary.filter((item) => progress.flashcards[item.id]).length
  const mastered = lesson.vocabulary.filter((item) => {
    const card = progress.flashcards[item.id]
    return card?.ease === "good" || card?.ease === "easy"
  }).length

  function nextCard() {
    setFlipped(false)
    setIndex((current) => {
      if (cards.length === 0) return 0
      return current + 1 >= cards.length ? 0 : current + 1
    })
  }

  function handleRate(rating: "again" | "hard" | "good" | "easy") {
    if (!currentCard) return
    reviewFlashcard(lesson.id, currentCard.id, rating)
    nextCard()
  }

  if (!currentCard) {
    return (
      <div className="space-y-6">
        <Button asChild variant="ghost" className="gap-2">
          <Link href="/flashcards"><ArrowLeft className="h-4 w-4" />Kembali</Link>
        </Button>
        <Card>
          <CardContent className="p-8 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
            <h1 className="mt-4 text-2xl font-bold">Tidak ada kartu due</h1>
            <p className="mt-2 text-slate-500">Semua kartu sudah direview untuk sekarang.</p>
            <Button className="mt-5 rounded-xl" onClick={() => { setOnlyDue(false); setIndex(0) }}>Tampilkan Semua Kartu</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button asChild variant="ghost" className="gap-2">
          <Link href="/flashcards"><ArrowLeft className="h-4 w-4" />Kembali</Link>
        </Button>
        <Button type="button" variant={onlyDue ? "default" : "outline"} className="rounded-xl" onClick={() => { setOnlyDue((value) => !value); setIndex(0); setFlipped(false) }}>
          {onlyDue ? "Mode Due Aktif" : "Review Due Only"}
        </Button>
      </div>

      <div>
        <p className="text-sm text-slate-500">Flashcard</p>
        <h1 className="text-3xl font-bold">{lesson.title}: {lesson.subtitle}</h1>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Card><CardContent className="p-4"><p className="text-sm text-slate-500">Kartu</p><p className="text-2xl font-bold">{index + 1}/{cards.length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-sm text-slate-500">Direview</p><p className="text-2xl font-bold">{reviewed}/{lesson.vocabulary.length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-sm text-slate-500">Dikuasai</p><p className="text-2xl font-bold">{mastered}</p></CardContent></Card>
      </div>

      <Flashcard item={currentCard} flipped={flipped} onFlip={() => setFlipped((value) => !value)} />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Button variant="destructive" className="rounded-xl" onClick={() => handleRate("again")}>Ulangi</Button>
        <Button variant="outline" className="rounded-xl" onClick={() => handleRate("hard")}>Sulit</Button>
        <Button variant="secondary" className="rounded-xl" onClick={() => handleRate("good")}>Ingat</Button>
        <Button className="rounded-xl" onClick={() => handleRate("easy")}>Mudah</Button>
      </div>

      <Button variant="ghost" className="w-full gap-2 rounded-xl" onClick={() => setFlipped(false)}>
        <RotateCcw className="h-4 w-4" />
        Reset Tampilan Kartu
      </Button>
    </div>
  )
}
