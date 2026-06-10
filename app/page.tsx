import { HomeDashboard } from "@/components/dashboard/home-dashboard"
import { getAllLessons } from "@/data/lessons"

export default function DashboardPage() {
  const lessons = getAllLessons()

  return <HomeDashboard lessons={lessons} />
}
