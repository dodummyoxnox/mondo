import type { Metadata } from "next"

import "./globals.css"

import { FloatingAIChat } from "@/components/ai/floating-ai-chat"
import { AppShell } from "@/components/layout/app-shell"
import { SplashScreen } from "@/components/layout/splash-screen"
import { ThemeProvider } from "@/components/theme/theme-provider"

export const metadata: Metadata = {
  title: "Mondo - Belajar Bahasa Jepang",
  description:
    "Aplikasi pembelajaran bahasa Jepang berbasis Minna no Nihongo I untuk pelajar Indonesia."
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <SplashScreen />
          <AppShell>{children}</AppShell>
          <FloatingAIChat />
        </ThemeProvider>
      </body>
    </html>
  )
}
