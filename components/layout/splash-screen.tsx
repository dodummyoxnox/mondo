"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

export function SplashScreen() {
  const [visible, setVisible] = useState(true)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => {
      setLeaving(true)
    }, 1800)

    const hideTimer = window.setTimeout(() => {
      setVisible(false)
    }, 2300)

    return () => {
      window.clearTimeout(leaveTimer)
      window.clearTimeout(hideTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950 transition-opacity duration-500",
        leaving && "opacity-0"
      )}
    >
      <div className="relative flex w-[min(88vw,360px)] flex-col items-center rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur">
        <div className="overflow-hidden rounded-2xl bg-slate-900 shadow-xl">
          <video
            src="/splash.mp4"
            autoPlay
            muted
            playsInline
            className="h-40 w-40 object-cover sm:h-48 sm:w-48"
          />
        </div>

        <div className="mt-5 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Mondo
          </h1>
          <p className="mt-1 text-sm text-slate-300">
            Bahaya Laten
          </p>
        </div>

        <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-2/3 animate-[splashLoading_1.4s_ease-in-out_infinite] rounded-full bg-white" />
        </div>
      </div>
    </div>
  )
}
