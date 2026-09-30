import { Heart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { toggleFavorite } from '@/store/slices/favoritesSlice'
import type { Course } from '@/types/course'
import { cn } from '@/lib/utils'

interface CourseCardProps {
  course: Course
  detailTo?: string
}

export default function CourseCard({ course, detailTo }: CourseCardProps) {
  const dispatch = useAppDispatch()
  const favoriteIds = useAppSelector((state) => state.favorites.ids)
  const isFavorite = favoriteIds.includes(course.id)
  const href = detailTo ?? `/courses/${course.id}`

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
        <Badge className="absolute left-3 top-3 bg-white/95 text-foreground shadow-sm" variant="secondary">
          {course.level}
        </Badge>
        <button
          type="button"
          aria-label={isFavorite ? 'Bỏ yêu thích' : 'Thêm yêu thích'}
          onClick={() => dispatch(toggleFavorite(course.id))}
          className={cn(
            'absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full shadow-sm transition',
            isFavorite
              ? 'bg-rose-500 text-white'
              : 'bg-white/95 text-muted-foreground hover:text-rose-500',
          )}
        >
          <Heart className={cn('h-4 w-4', isFavorite && 'fill-current')} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-sm font-medium text-primary">{course.category}</p>
        <h3 className="mt-1 line-clamp-2 text-base font-bold leading-snug text-navy-950">
          <Link to={href} className="hover:text-primary">
            {course.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{course.instructor}</p>

        <div className="mt-3 flex items-center gap-1.5 text-sm">
          <span className="font-bold text-amber-500">{course.rating.toFixed(1)}</span>
          <div className="flex items-center gap-0.5 text-amber-400">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={cn(
                  'h-3.5 w-3.5',
                  index < Math.round(course.rating) ? 'fill-current' : 'text-slate-300',
                )}
              />
            ))}
          </div>
          <span className="text-muted-foreground">({course.students.toLocaleString()})</span>
        </div>

        <p className="mt-3 line-clamp-2 flex-1 text-sm text-muted-foreground">{course.description}</p>

        <div className="mt-4 flex items-end justify-between border-t border-border pt-3">
          <div>
            <p className="text-xs text-muted-foreground">
              {course.duration} · {course.lessons} bài
            </p>
            <p className="mt-1 text-lg font-bold text-navy-950">
              {course.price === 0 ? 'Miễn phí' : `$${course.price}`}
            </p>
          </div>
          <Button asChild size="sm">
            <Link to={href}>Xem khóa</Link>
          </Button>
        </div>
      </div>
    </article>
  )
}
