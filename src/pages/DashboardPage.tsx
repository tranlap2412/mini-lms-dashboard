import {
  ArrowRight,
  BookOpenCheck,
  Clock3,
  Heart,
  Sparkles,
  Star,
  TrendingUp,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import CoursesLoader from '@/components/common/CoursesLoader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { DashboardSkeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/contexts/AuthContext'
import { useAppSelector } from '@/store/hooks'

function progressFor(courseId: string) {
  let hash = 0
  for (const char of courseId) hash = (hash + char.charCodeAt(0) * 17) % 100
  return 25 + (hash % 60)
}

export default function DashboardPage() {
  const { user } = useAuth()
  const favoriteCount = useAppSelector((state) => state.favorites.ids.length)
  const enrolledCount = user?.enrolledCourseIds.length ?? 0

  return (
    <CoursesLoader skeleton={<DashboardSkeleton />}>
      {(courses) => {
        const enrolled = courses.filter((course) => user?.enrolledCourseIds.includes(course.id))
        const freeCount = enrolled.filter((course) => course.price === 0).length
        const avgRating =
          enrolled.length === 0
            ? 0
            : enrolled.reduce((sum, course) => sum + course.rating, 0) / enrolled.length
        const continueCourses = enrolled.slice(0, 3)
        const overallProgress =
          continueCourses.length === 0
            ? 0
            : Math.round(
                continueCourses.reduce((sum, course) => sum + progressFor(course.id), 0) /
                  continueCourses.length,
              )

        const stats = [
          {
            label: 'Đang tham gia',
            value: enrolledCount,
            icon: BookOpenCheck,
            tone: 'bg-blue-50 text-primary',
          },
          {
            label: 'Yêu thích',
            value: favoriteCount,
            icon: Heart,
            tone: 'bg-rose-50 text-rose-600',
          },
          {
            label: 'Khóa miễn phí',
            value: freeCount,
            icon: Sparkles,
            tone: 'bg-amber-50 text-amber-600',
          },
          {
            label: 'Rating trung bình',
            value: avgRating.toFixed(1),
            icon: Star,
            tone: 'bg-emerald-50 text-emerald-600',
          },
        ]

        return (
          <div className="space-y-6">
            <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-navy-950 via-navy-900 to-primary px-5 py-7 text-white shadow-card sm:px-8 sm:py-8">
              <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
                <div className="max-w-2xl">
                  <h1 className="text-3xl font-bold leading-snug sm:text-4xl">
                    Xin chào, {user?.name?.split(' ')[0] ?? 'bạn'}
                  </h1>
                  <p className="mt-2 text-sm text-blue-100/85 sm:text-base">
                    Theo dõi tiến độ, tiếp tục khóa đang học và giữ nhịp học tập mỗi ngày.
                  </p>
                  <div className="mt-5 max-w-md space-y-2">
                    <div className="flex items-center justify-between text-xs text-blue-100/80">
                      <span className="inline-flex items-center gap-1.5">
                        <TrendingUp className="h-3.5 w-3.5" />
                        Tiến độ trung bình
                      </span>
                      <span className="font-semibold text-white">{overallProgress}%</span>
                    </div>
                    <Progress value={overallProgress} className="bg-white/15" />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button asChild className="bg-white text-navy-950 hover:bg-blue-50">
                    <Link to="/dashboard/my-courses">
                      Khóa học của tôi
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
                  >
                    <Link to="/courses">Khám phá thêm</Link>
                  </Button>
                </div>
              </div>
            </section>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <article
                    key={stat.label}
                    className="rounded-2xl border border-border bg-white p-5 shadow-card"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="mt-2 text-3xl font-bold text-navy-950">
                          {stat.value}
                        </p>
                      </div>
                      <span className={`grid h-10 w-10 place-items-center rounded-xl ${stat.tone}`}>
                        <Icon className="h-4 w-4" />
                      </span>
                    </div>
                  </article>
                )
              })}
            </div>

            <div className="grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
              <section className="rounded-2xl border border-border bg-white p-5 shadow-card sm:p-6">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-bold leading-snug text-navy-950">Tiếp tục học</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Các khóa gần đây trong danh sách đã tham gia.
                    </p>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/dashboard/my-courses">Xem tất cả</Link>
                  </Button>
                </div>

                {continueCourses.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-border bg-muted/40 px-4 py-10 text-center">
                    <p className="text-sm text-muted-foreground">Bạn chưa có khóa nào để tiếp tục.</p>
                    <Button asChild className="mt-4" size="sm">
                      <Link to="/courses">Chọn khóa học</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {continueCourses.map((course) => {
                      const progress = progressFor(course.id)
                      return (
                        <div
                          key={course.id}
                          className="flex flex-col gap-4 rounded-2xl border border-border p-4 sm:flex-row sm:items-center"
                        >
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="h-28 w-full rounded-xl object-cover sm:h-16 sm:w-28"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge variant="secondary">{course.category}</Badge>
                              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock3 className="h-3.5 w-3.5" />
                                {course.duration}
                              </span>
                            </div>
                            <h3 className="mt-1 truncate font-semibold text-navy-950">
                              {course.title}
                            </h3>
                            <div className="mt-3 space-y-1.5">
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>Tiến độ</span>
                                <span className="font-semibold text-foreground">{progress}%</span>
                              </div>
                              <Progress value={progress} />
                            </div>
                          </div>
                          <Button asChild size="sm" className="sm:self-center">
                            <Link to={`/courses/${course.id}`}>Học tiếp</Link>
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                )}
              </section>

              <div className="space-y-4">
                <section className="rounded-2xl border border-border bg-white p-5 shadow-card sm:p-6">
                  <h2 className="text-lg font-bold leading-snug text-navy-950">Tình trạng học tập</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Bạn đang theo dõi {enrolled.length}/{courses.length} khóa trong catalog. Giữ nhịp
                    học đều để hoàn thành lộ trình nhanh hơn.
                  </p>
                  <Button asChild className="mt-5 w-full sm:w-auto">
                    <Link to="/favorites">Xem danh sách yêu thích</Link>
                  </Button>
                </section>

                <section className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-5 sm:p-6">
                  <h2 className="text-lg font-bold leading-snug text-navy-950">Gợi ý hôm nay</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Dành 20–30 phút để hoàn thành thêm một bài trong khóa đang dở. Momentum nhỏ mỗi
                    ngày giúp bạn giữ streak học tập.
                  </p>
                </section>
              </div>
            </div>
          </div>
        )
      }}
    </CoursesLoader>
  )
}
