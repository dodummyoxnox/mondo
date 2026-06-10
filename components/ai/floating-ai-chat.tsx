"use client"

import { FormEvent, useEffect, useMemo, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { Bot, Eraser, Loader2, MessageCircle, Send, Sparkles, X } from "lucide-react"

import type { AIChatMessage } from "@/types"
import { STORAGE_KEYS } from "@/lib/storage-keys"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

const starterPrompts = [
  "Jelaskan pola は dan が",
  "Koreksi kalimat saya: わたしが がくせいです",
  "Latihan roleplay perkenalan diri",
  "Buat 5 soal dari Pelajaran 1"
]

function createMessage(role: AIChatMessage["role"], content: string): AIChatMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    createdAt: new Date().toISOString()
  }
}

function getLessonIdFromPath(pathname: string) {
  const match = pathname.match(/\/lessons\/(\d+)/)
  if (!match) return null

  const lessonId = Number(match[1])
  return Number.isNaN(lessonId) ? null : lessonId
}

export function FloatingAIChat() {
  const pathname = usePathname()
  const bottomRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<AIChatMessage[]>([])
  const [error, setError] = useState("")

  const currentLessonId = useMemo(() => getLessonIdFromPath(pathname), [pathname])

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEYS.chatHistory)
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as AIChatMessage[]
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed)
          return
        }
      } catch {
        window.localStorage.removeItem(STORAGE_KEYS.chatHistory)
      }
    }

    setMessages([
      createMessage(
        "assistant",
        "Halo! Saya Harmoko Sensei. Kamu bisa tanya grammar, kosakata, minta koreksi kalimat Jepang, atau latihan percakapan."
      )
    ])
  }, [])

  useEffect(() => {
    if (messages.length > 0) {
      window.localStorage.setItem(STORAGE_KEYS.chatHistory, JSON.stringify(messages))
      bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  async function sendChat(text: string) {
    const cleanText = text.trim()
    if (!cleanText || isLoading) return

    setError("")
    setInput("")

    const nextMessages = [...messages, createMessage("user", cleanText)]
    setMessages(nextMessages)
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: nextMessages,
          context: {
            pathname,
            currentLessonId
          }
        })
      })

      const data = (await response.json()) as { content?: string; error?: string }

      if (!response.ok) {
        throw new Error(data.error ?? "Harmoko Sensei error.")
      }

      setMessages((prev) => [
        ...prev,
        createMessage("assistant", data.content ?? "Maaf, saya belum bisa menjawab.")
      ])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi error.")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await sendChat(input)
  }

  function clearChat() {
    const welcome = [
      createMessage(
        "assistant",
        "Riwayat chat sudah dihapus. Mau belajar apa sekarang?"
      )
    ]

    setMessages(welcome)
    window.localStorage.setItem(STORAGE_KEYS.chatHistory, JSON.stringify(welcome))
  }

  return (
    <>
      <Button
        type="button"
        onClick={() => setOpen(true)}
        className={cn("fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full shadow-xl", open && "hidden")}
        aria-label="Buka Harmoko Sensei"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {open && (
        <section className="fixed bottom-5 right-5 z-50 flex h-[640px] w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950">
          <header className="flex items-center justify-between border-b border-slate-200 bg-slate-950 px-4 py-4 text-white dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">Harmoko Sensei</p>
                  <Badge className="border-transparent bg-emerald-500 text-white">Online</Badge>
                </div>
                <p className="text-xs text-slate-300">Guru Jepang pribadi kamu</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Button type="button" size="icon" variant="ghost" onClick={clearChat} className="text-white hover:bg-white/10 hover:text-white">
                <Eraser className="h-5 w-5" />
              </Button>
              <Button type="button" size="icon" variant="ghost" onClick={() => setOpen(false)} className="text-white hover:bg-white/10 hover:text-white">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto bg-slate-50 px-4 py-4 dark:bg-slate-950">
            <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                <Sparkles className="h-3.5 w-3.5" />
                Prompt cepat
              </div>

              <div className="flex flex-wrap gap-2">
                {starterPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendChat(prompt)}
                    disabled={isLoading}
                    className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600 transition hover:bg-slate-100 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {messages.map((message) => {
                const isUser = message.role === "user"
                return (
                  <div key={message.id} className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}>
                    {!isUser && (
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}
                    <div className={cn("max-w-[82%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6", isUser ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950" : "border border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200")}>
                      {message.content}
                    </div>
                  </div>
                )
              })}

              {isLoading && (
                <div className="flex justify-start gap-3">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Harmoko Sensei sedang menjawab...
                  </div>
                </div>
              )}

              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
                  {error}
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="border-t border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-end gap-2">
              <Textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Tanya grammar, kosakata, roleplay, atau koreksi kalimat..."
                className="min-h-11 max-h-32 resize-none rounded-2xl"
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault()
                    event.currentTarget.form?.requestSubmit()
                  }
                }}
              />

              <Button type="submit" size="icon" className="h-11 w-11 rounded-2xl" disabled={!input.trim() || isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
            <p className="mt-2 text-center text-[11px] text-slate-400">AI bisa salah. Gunakan sebagai pendamping belajar.</p>
          </form>
        </section>
      )}
    </>
  )
}
