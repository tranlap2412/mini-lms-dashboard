import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Heart,
  PlayCircle,
  Star,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { toggleFavorite } from '@/store/slices/favoritesSlice'
import type { Course } from '@/types/course'
import { cn } from '@/lib/utils'

interface CourseDetailViewProps {
  course: Course
}

function buildOutcomes(course: Course) {
  const tagOutcomes = course.tags.map(
    (tag) => `Nắm vững ${tag} và áp dụng ngay vào dự án thực tế.`,
  )
  const defaults = [
    'Hiểu rõ các khái niệm cốt lõi và kỹ thuật nâng cao của khóa học.',
    'Xây dựng được mini project hoàn chỉnh theo đúng lộ trình bài học.',
    'Biết cách tổ chức code sạch, dễ bảo trì và mở rộng.',
    'Tự tin debug, tối ưu và trình bày sản phẩm như môi trường làm việc thật.',
    `Làm chủ ${course.level.toLowerCase()} level trong lĩnh vực ${course.category}.`,
    `Áp dụng kiến thức từ ${course.lessons} bài học vào portfolio cá nhân.`,
  ]
  return [...tagOutcomes, ...defaults].slice(0, 6)
}

function buildModules(course: Course) {
  const titles = [
    `Giới thiệu ${course.title}`,
    'Nền tảng và khái niệm quan trọng',
    'Thực hành theo dự án nhỏ',
    'Kỹ thuật nâng cao & best practices',
    'Tổng kết và định hướng tiếp theo',
  ]
  const durations = ['12:00', '18:30', '22:15', '25:00', '15:45']
  const count = Math.min(5, Math.max(3, Math.ceil(course.lessons / 5)))

  return titles.slice(0, count).map((title, index) => ({
    id: `${course.id}-module-${index + 1}`,
    title: `Module ${index + 1}: ${title}`,
    duration: durations[index],
  }))
}

export default function CourseDetailView({ course }: CourseDetailViewProps) {
  const dispatch = useAppDispatch()
  const isFavorite = useAppSelector((state) => state.favorites.ids.includes(course.id))
  const outcomes = buildOutcomes(course)
  const modules = buildModules(course)

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[280px] bg-muted lg:min-h-full">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap gap-2">
              <Badge>{course.category}</Badge>
              <Badge variant="secondary">{course.level}</Badge>
            </div>

            <h1 className="mt-4 text-3xl font-bold leading-snug text-navy-950 sm:text-4xl">
              {course.title}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {course.description}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-amber-500">{course.rating.toFixed(1)}</span>
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-muted-foreground">đánh giá</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Users className="h-4 w-4" />
                {course.students.toLocaleString()} học viên
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock3 className="h-4 w-4" />
                {course.duration}
              </div>
            </div>

            <p className="mt-4 text-sm">
              Giảng viên:{' '}
              <span className="font-semibold text-foreground">{course.instructor}</span>
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
              {[
                ['Thời lượng', course.duration],
                ['Bài học', `${course.lessons} bài`],
                ['Học phí', course.price === 0 ? 'Miễn phí' : `$${course.price}`],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-muted/70 p-3">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="mt-1 font-semibold text-foreground">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {course.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  #{tag}
                </Badge>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                variant={isFavorite ? 'accent' : 'outline'}
                onClick={() => dispatch(toggleFavorite(course.id))}
              >
                <Heart className={cn('h-4 w-4', isFavorite && 'fill-current')} />
                {isFavorite ? 'Đã yêu thích' : 'Thêm yêu thích'}
              </Button>
              <Button asChild variant="secondary">
                <Link to="/courses">
                  <ArrowLeft className="h-4 w-4" />
                  Quay lại danh sách
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-white p-6 shadow-card sm:p-8">
        <h2 className="text-2xl font-bold leading-snug text-navy-950 sm:text-3xl">
          About This Course
        </h2>
        <p className="mt-4 max-w-4xl text-base leading-relaxed text-muted-foreground sm:text-[17px]">
          {course.longDescription}
        </p>
      </section>

      <section className="rounded-3xl border border-border bg-white p-6 shadow-card sm:p-8">
        <h2 className="text-2xl font-bold leading-snug text-navy-950 sm:text-3xl">
          What You&apos;ll Learn
        </h2>
        <ul className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2">
          {outcomes.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
              <span className="text-sm leading-relaxed text-slate-700 sm:text-[15px]">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl border border-border bg-white p-6 shadow-card sm:p-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold leading-snug text-navy-950 sm:text-3xl">
              Course Content
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {modules.length} modules · {course.lessons} lessons · {course.duration} total
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border">
          {modules.map((module, index) => (
            <div
              key={module.id}
              className={cn(
                'flex items-center justify-between gap-4 px-4 py-4 sm:px-5',
                index !== modules.length - 1 && 'border-b border-border',
              )}
            >
              <div className="flex min-w-0 items-center gap-3">
                <PlayCircle className="h-5 w-5 shrink-0 text-slate-400" />
                <p className="truncate text-sm font-semibold text-navy-950 sm:text-[15px]">
                  {module.title}
                </p>
              </div>
              <span className="shrink-0 text-sm tabular-nums text-muted-foreground">
                {module.duration}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
