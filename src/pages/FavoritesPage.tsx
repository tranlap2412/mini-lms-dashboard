import { Link } from 'react-router-dom'
import CoursesLoader from '@/components/common/CoursesLoader'
import EmptyState from '@/components/common/EmptyState'
import CourseGrid from '@/components/course/CourseGrid'
import { Button } from '@/components/ui/button'
import { CourseGridSkeleton } from '@/components/ui/skeleton'
import { useAppSelector } from '@/store/hooks'

export default function FavoritesPage() {
  const favoriteIds = useAppSelector((state) => state.favorites.ids)

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-6">
      <header>
        <h1 className="text-3xl font-bold leading-snug text-navy-950 sm:text-4xl">
          Khóa học yêu thích
        </h1>
        <p className="mt-2 text-muted-foreground">
          Những khóa bạn đã đánh dấu để xem lại sau.
        </p>
      </header>

      <CoursesLoader skeleton={<CourseGridSkeleton count={3} />}>
        {(courses) => {
          const favorites = courses.filter((course) => favoriteIds.includes(course.id))

          if (favorites.length === 0) {
            return (
              <EmptyState
                title="Chưa có khóa học yêu thích"
                description="Bấm trái tim trên thẻ khóa học để thêm vào wishlist của bạn."
                action={
                  <Button asChild>
                    <Link to="/courses">Duyệt khóa học</Link>
                  </Button>
                }
              />
            )
          }

          return (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Đã lưu <span className="font-semibold text-foreground">{favorites.length}</span> khóa
              </p>
              <CourseGrid courses={favorites} />
            </div>
          )
        }}
      </CoursesLoader>
    </div>
  )
}
