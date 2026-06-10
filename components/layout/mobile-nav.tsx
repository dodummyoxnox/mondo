"use client"

import Link from "next/link"
import { Brain,
  ClipboardList,
  CircleHelp, Home, Library, Search } from "lucide-react"

import { ModeToggle } from "@/components/theme/mode-toggle"

const items = [
  { title: "Home", href: "/", icon: Home },
  { title: "Flashcard", href: "/flashcards", icon: Brain },
  { title: "Kuis", href: "/quizzes", icon: CircleHelp },
  { title: "Bunpou", href: "/bunpou", icon: ClipboardList },
  { title: "Appendix", href: "/appendices", icon: Library }
]

export function MobileNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 lg:hidden">
      <div className="flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <img
            src="/logo.jpg"
            alt="Mondo Logo"
            className="h-9 w-9 rounded-2xl object-cover"
          />
          Mondo
        </Link>

        <div className="flex items-center gap-1">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href} className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900" aria-label={item.title}>
                <Icon className="h-5 w-5" />
              </Link>
            )
          })}
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
