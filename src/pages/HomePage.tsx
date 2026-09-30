import { ArrowRight, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import CoursesLoader from '@/components/common/CoursesLoader'
import CourseGrid from '@/components/course/CourseGrid'
import { Button } from '@/components/ui/button'
import { CourseGridSkeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/contexts/AuthContext'

const categories = ['Frontend', 'Design', 'Career', 'TypeScript', 'State Management']

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80'

export default function HomePage() {
  const { isLoggedIn } = useAuth()

  return (
    <div>
      <section className="relative isolate min-h-[42vh] overflow-hidden sm:min-h-[48vh]">
        <img
          src={HERO_IMAGE}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/88 to-navy-950/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-navy-950/20" />

        <div className="relative mx-auto flex min-h-[42vh] max-w-6xl flex-col justify-center px-4 py-12 sm:min-h-[48vh] sm:px-6 sm:py-14">
          <p className="text-sm font-semibold text-blue-200">LearnHub</p>
          <h1 className="mt-2 max-w-3xl text-3xl font-extrabold leading-snug text-white sm:text-4xl lg:text-5xl">
            Học kỹ năng mới với lộ trình rõ ràng
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-blue-50/85 sm:text-base">
            Khám phá khóa học thực chiến, lưu yêu thích và theo dõi tiến độ học tập trên một nền tảng
            gọn nhẹ.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="h-11 rounded-xl bg-primary px-5 shadow-lg shadow-primary/30 hover:bg-primary/90"
            >
              <Link to="/courses">
                <Search className="h-4 w-4" />
                Duyệt khóa học
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-11 rounded-xl border-white/30 bg-white/10 px-5 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
            >
              <Link to={isLoggedIn ? '/dashboard' : '/login'}>
                {isLoggedIn ? 'Vào khu học tập' : 'Bắt đầu học'}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-4 sm:px-6">
          {categories.map((category) => (
            <Link
              key={category}
              to="/courses"
              className="shrink-0 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-3xl font-bold leading-snug text-navy-950">Khóa học nổi bật</h2>
            <p className="mt-2 text-muted-foreground">Được học viên quan tâm nhiều trong tuần này.</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/courses">
              Xem tất cả
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <CoursesLoader skeleton={<CourseGridSkeleton count={3} />}>
          {(courses) => <CourseGrid courses={courses.slice(0, 3)} />}
        </CoursesLoader>
      </section>
    </div>
  )
}
