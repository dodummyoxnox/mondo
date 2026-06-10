"use client"

import { KeyboardEvent } from "react"
import { RotateCcw, Volume2 } from "lucide-react"

import type { VocabularyItem } from "@/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface FlashcardProps {
  item: VocabularyItem
  flipped: boolean
  onFlip: () => void
}

function speakJapanese(text: string) {
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = "ja-JP"
  utterance.rate = 0.85

  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utterance)
}

export function Flashcard({ item, flipped, onFlip }: FlashcardProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onFlip()
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onFlip}
      onKeyDown={handleKeyDown}
      className="group h-[360px] w-full cursor-pointer rounded-3xl text-left outline-none [perspective:1200px] focus-visible:ring-2 focus-visible:ring-slate-400"
      aria-label="Flashcard. Klik untuk membalik kartu."
    >
      <div
        className={cn(
          "relative h-full w-full rounded-3xl transition duration-500 [transform-style:preserve-3d]",
          flipped && "[transform:rotateY(180deg)]"
        )}
      >
        <div className="absolute inset-0 flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm [backface-visibility:hidden] dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <Badge variant="secondary">Depan</Badge>
            <RotateCcw className="h-5 w-5 text-slate-400 transition group-hover:rotate-45" />
          </div>

          <div className="text-center">
            <p className="text-5xl font-bold tracking-tight">{item.kana}</p>
            {item.kanji && (
              <p className="mt-4 text-2xl text-slate-500 dark:text-slate-400">
                {item.kanji}
              </p>
            )}
          </div>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            Klik kartu untuk melihat arti
          </p>
        </div>

        <div className="absolute inset-0 flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)] dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <Badge>Belakang</Badge>

            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="rounded-xl"
              onClick={(event) => {
                event.stopPropagation()
                speakJapanese(item.audioText ?? item.kana)
              }}
              aria-label="Putar suara Jepang"
            >
              <Volume2 className="h-5 w-5" />
            </Button>
          </div>

          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Romaji
            </p>
            <p className="mt-1 text-xl font-semibold">{item.romaji}</p>

            <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
              Arti
            </p>
            <p className="mt-1 text-2xl font-bold">{item.indonesian}</p>

            {item.examples[0] && (
              <div className="mt-5 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                <p className="font-medium">{item.examples[0].japanese}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {item.examples[0].romaji}
                </p>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                  {item.examples[0].indonesian}
                </p>
              </div>
            )}
          </div>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            Nilai ingatanmu setelah melihat jawaban
          </p>
        </div>
      </div>
    </div>
  )
}
