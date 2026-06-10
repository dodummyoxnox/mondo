"use client"

import { CheckCircle2, Circle } from "lucide-react"

import { useProgress } from "@/hooks/use-progress"
import { Button } from "@/components/ui/button"

interface LessonProgressButtonProps {
  lessonId: number
}

export function LessonProgressButton({ lessonId }: LessonProgressButtonProps) {
  const { progress, toggleLessonCompleted } = useProgress()
  const isCompleted = progress.completedLessons.includes(lessonId)

  return (
    <Button type="button" variant={isCompleted ? "default" : "outline"} className="gap-2 rounded-xl" onClick={() => toggleLessonCompleted(lessonId)}>
      {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
      {isCompleted ? "Selesai" : "Tandai Selesai"}
    </Button>
  )
}
