import * as React from "react"
import { cn } from "@/lib/utils"

export function Progress({
  value = 0,
  className
}: {
  value?: number
  className?: string
}) {
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800", className)}>
      <div
        className="h-full bg-slate-950 transition-all dark:bg-white"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}
