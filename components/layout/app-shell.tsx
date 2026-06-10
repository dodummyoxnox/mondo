import type { ReactNode } from "react"
import { SidebarNav } from "@/components/layout/sidebar"
import { MobileNav } from "@/components/layout/mobile-nav"

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <SidebarNav />
      <MobileNav />

      <main className="min-h-screen pt-16 lg:pl-72 lg:pt-0">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}
