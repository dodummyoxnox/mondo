"use client"

import { BookOpen, Globe2, MessageCircle, Volume2 } from "lucide-react"

import type { Lesson } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface LessonDetailTabsProps {
  lesson: Lesson
}

function speakJapanese(text: string) {
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = "ja-JP"
  utterance.rate = 0.85
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utterance)
}

export function LessonDetailTabs({ lesson }: LessonDetailTabsProps) {
  return (
    <Tabs defaultValue="vocabulary" className="space-y-5">
      <TabsList className="grid h-auto w-full grid-cols-2 rounded-2xl bg-white p-1 shadow-sm dark:bg-slate-900 sm:grid-cols-4">
        <TabsTrigger value="vocabulary" className="rounded-xl">Kosakata</TabsTrigger>
        <TabsTrigger value="grammar" className="rounded-xl">Tata Bahasa</TabsTrigger>
        <TabsTrigger value="conversation" className="rounded-xl">Percakapan</TabsTrigger>
        <TabsTrigger value="culture" className="rounded-xl">Info Jepang</TabsTrigger>
      </TabsList>

      <TabsContent value="vocabulary" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          {lesson.vocabulary.map((item) => (
            <Card key={item.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-2xl">{item.kana}</CardTitle>
                    <CardDescription className="mt-1">{item.kanji ? `${item.kanji} · ` : ""}{item.romaji}</CardDescription>
                  </div>
                  <Button type="button" size="icon" variant="secondary" className="rounded-xl" onClick={() => speakJapanese(item.audioText ?? item.kana)}>
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-slate-500">Arti</p>
                  <p className="text-lg font-semibold">{item.indonesian}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{item.partOfSpeech}</Badge>
                  {item.tags.map((tag) => <Badge key={tag} variant="outline">{tag}</Badge>)}
                </div>
                {item.examples[0] && (
                  <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                    <p className="font-medium">{item.examples[0].japanese}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.examples[0].romaji}</p>
                    <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{item.examples[0].indonesian}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="grammar" className="space-y-4">
        {lesson.grammar.map((grammar) => (
          <Card key={grammar.id}>
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle>{grammar.title}</CardTitle>
                  <CardDescription className="mt-1">{grammar.shortExplanation}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="rounded-2xl bg-slate-950 p-4 text-white dark:bg-slate-800">
                <p className="text-sm text-slate-300">Pola</p>
                <p className="mt-1 font-mono text-lg font-semibold">{grammar.pattern}</p>
              </div>
              <p className="leading-7 text-slate-700 dark:text-slate-300">{grammar.detailedExplanation}</p>
              <div className="space-y-3">
                <p className="font-semibold">Contoh Kalimat</p>
                {grammar.examples.map((example) => (
                  <div key={example.id} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium">{example.japanese}</p>
                        <p className="mt-1 text-sm text-slate-500">{example.romaji}</p>
                        <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{example.indonesian}</p>
                      </div>
                      <Button type="button" size="icon" variant="ghost" onClick={() => speakJapanese(example.japanese)}>
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-red-100 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
                <p className="font-semibold text-red-700 dark:text-red-300">Kesalahan Umum</p>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{grammar.commonMistakes[0]?.explanation}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </TabsContent>

      <TabsContent value="conversation" className="space-y-4">
        {lesson.conversations.map((conversation) => (
          <Card key={conversation.id}>
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle>{conversation.title}</CardTitle>
                  <CardDescription>{conversation.context}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {conversation.lines.map((line) => (
                <div key={line.id} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <Badge variant="secondary">{line.speaker}</Badge>
                    <Button type="button" size="icon" variant="ghost" onClick={() => speakJapanese(line.japanese)}>
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="font-medium">{line.japanese}</p>
                  <p className="mt-1 text-sm text-slate-500">{line.romaji}</p>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{line.indonesian}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </TabsContent>

      <TabsContent value="culture" className="space-y-4">
        {lesson.cultureNotes.map((note) => (
          <Card key={note.id}>
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                  <Globe2 className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle>{note.title}</CardTitle>
                  <CardDescription>Info budaya dan penggunaan alami</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="leading-7 text-slate-700 dark:text-slate-300">{note.body}</p>
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                <p className="font-semibold">Tips</p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-600 dark:text-slate-300">
                  {note.tips.map((tip) => <li key={tip}>{tip}</li>)}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </TabsContent>
    </Tabs>
  )
}
