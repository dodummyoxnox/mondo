import { getAllLessons } from "@/data/lessons"
import { GlobalSearch } from "@/components/search/global-search"

export default function SearchPage() {
  const lessons = getAllLessons()

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-sm text-slate-500">Global Search</p>
        <h1 className="text-3xl font-bold">Cari Materi</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Cari kosakata dan tata bahasa dari semua pelajaran.</p>
      </div>
      <GlobalSearch lessons={lessons} />
    </div>
  )
}
