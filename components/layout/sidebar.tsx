"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen,
  ClipboardList, Brain,
  CircleHelp, Home, Library, MessageCircle, Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { getAllLessons } from "@/data/lessons"
import { ModeToggle } from "@/components/theme/mode-toggle"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const mainNav = [
  { title: "Dashboard", href: "/", icon: Home },
  { title: "Flashcard", href: "/flashcards", icon: Brain },
  { title: "Kuis", href: "/quizzes", icon: CircleHelp },
  { title: "Appendices", href: "/appendices", icon: Library },
  { title: "Bunpou", href: "/bunpou", icon: ClipboardList }
]

export function SidebarNav() {
  const pathname = usePathname()
  const lessons = getAllLessons()

  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-72 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 lg:block">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between p-5">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.jpg"
              alt="Mondo Logo"
              className="h-11 w-11 rounded-2xl object-cover"
            />
            <div>
              <p className="text-lg font-bold leading-none">Mondo</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Bahaya Laten</p>
            </div>
          </Link>
          <ModeToggle />
        </div>

        <div className="px-3">
          <div className="space-y-1">
            {mainNav.map((item) => {
              const Icon = item.icon
              const active = pathname === item.href
              return (
                <Button key={item.href} asChild variant={active ? "secondary" : "ghost"} className="w-full justify-start gap-3 rounded-xl">
                  <Link href={item.href}>
                    <Icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                </Button>
              )
            })}
          </div>
        </div>

        <Separator className="my-4" />

        <div className="px-5 pb-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Pelajaran</p>
            <Badge variant="secondary">{lessons.length} Bab</Badge>
          </div>
        </div>

        <ScrollArea className="flex-1 px-3 pb-5">
          <div className="space-y-1">
            {lessons.map((lesson) => {
              const href = `/lessons/${lesson.id}`
              const active = pathname === href
              return (
                <Button key={lesson.id} asChild variant="ghost" className={cn("h-auto w-full justify-start rounded-xl px-3 py-3 text-left", active && "bg-slate-100 dark:bg-slate-900")}>
                  <Link href={href}>
                    <div className="flex w-full items-start gap-3">
                      <div className={cn("mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border text-xs font-bold", active ? "border-slate-950 bg-slate-950 text-white dark:border-white dark:bg-white dark:text-slate-950" : "border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300")}>
                        {lesson.id}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-3.5 w-3.5 text-slate-400" />
                          <p className="truncate text-sm font-medium">{lesson.title}</p>
                        </div>
                        <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">{lesson.subtitle}</p>
                      </div>
                    </div>
                  </Link>
                </Button>
              )
            })}
          </div>
        </ScrollArea>

        <div className="border-t border-slate-200 p-4 dark:border-slate-800">
          <div className="rounded-2xl bg-slate-950 p-4 text-white dark:bg-slate-900">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <p className="text-sm font-semibold">Harmoko Sensei</p>
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-300">Tanya grammar, kosakata, atau minta koreksi kalimat Jepang.</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
