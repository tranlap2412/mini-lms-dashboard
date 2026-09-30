import type { Course } from '@/types/course'
import CourseCard from './CourseCard'

interface CourseGridProps {
  courses: Course[]
  detailToPrefix?: string
}

export default function CourseGrid({ courses, detailToPrefix }: CourseGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          detailTo={detailToPrefix ? `${detailToPrefix}/${course.id}` : undefined}
        />
      ))}
    </div>
  )
}
