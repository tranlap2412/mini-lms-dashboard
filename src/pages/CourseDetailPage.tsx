import CoursesLoader from '@/components/common/CoursesLoader'
import EmptyState from '@/components/common/EmptyState'
import CourseDetailView from '@/components/course/CourseDetailView'
import { Button } from '@/components/ui/button'
import { CourseDetailSkeleton } from '@/components/ui/skeleton'
import { Link, useParams } from 'react-router-dom'

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <CoursesLoader skeleton={<CourseDetailSkeleton />}>
        {(courses) => {
          const course = courses.find((item) => item.id === id)

          if (!course) {
            return (
              <EmptyState
                title="Không tìm thấy khóa học"
                description={`Không có course nào với id “${id}”.`}
                action={
                  <Button asChild>
                    <Link to="/courses">Quay lại danh sách</Link>
                  </Button>
                }
              />
            )
          }

          return <CourseDetailView course={course} />
        }}
      </CoursesLoader>
    </div>
  )
}
