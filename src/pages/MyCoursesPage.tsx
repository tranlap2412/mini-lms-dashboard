import { Link } from 'react-router-dom'
import CoursesLoader from '@/components/common/CoursesLoader'
import EmptyState from '@/components/common/EmptyState'
import CourseGrid from '@/components/course/CourseGrid'
import { Button } from '@/components/ui/button'
import { CourseGridSkeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/contexts/AuthContext'

export default function MyCoursesPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold leading-snug text-navy-950">Khóa học của tôi</h1>
        <p className="mt-2 text-muted-foreground">
          Các khóa bạn đang tham gia và có thể tiếp tục học bất cứ lúc nào.
        </p>
      </header>

      <CoursesLoader skeleton={<CourseGridSkeleton count={4} />}>
        {(courses) => {
          const mine = courses.filter((course) => user?.enrolledCourseIds.includes(course.id))

          if (mine.length === 0) {
            return (
              <EmptyState
                title="Bạn chưa tham gia khóa nào"
                description="Hãy khám phá catalog và chọn khóa phù hợp với mục tiêu của bạn."
                action={
                  <Button asChild>
                    <Link to="/courses">Khám phá khóa học</Link>
                  </Button>
                }
              />
            )
          }

          return (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Bạn đang học <span className="font-semibold text-foreground">{mine.length}</span> khóa
              </p>
              <CourseGrid courses={mine} />
            </div>
          )
        }}
      </CoursesLoader>
    </div>
  )
}
