import { BunpouLibrary } from "@/components/bunpou/bunpou-library"
import { getAllLessons } from "@/data/lessons"

export default function BunpouPage() {
  const lessons = getAllLessons()

  return <BunpouLibrary lessons={lessons} />
}
