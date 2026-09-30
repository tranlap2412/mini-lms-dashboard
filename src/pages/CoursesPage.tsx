import { Search } from 'lucide-react'
import { useState } from 'react'
import CoursesLoader from '@/components/common/CoursesLoader'
import EmptyState from '@/components/common/EmptyState'
import CourseGrid from '@/components/course/CourseGrid'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CourseGridSkeleton } from '@/components/ui/skeleton'

export default function CoursesPage() {
  const [query, setQuery] = useState('')
  const [level, setLevel] = useState('All')

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-6">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold leading-snug text-navy-950 sm:text-4xl">
          Tất cả khóa học
        </h1>
        <p className="mt-2 text-muted-foreground">
          Tìm khóa phù hợp theo tên, giảng viên hoặc cấp độ học.
        </p>
      </header>

      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-4 shadow-card sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tìm theo tên khóa, tag, giảng viên..."
            className="pl-9"
          />
        </div>
        <Select value={level} onValueChange={setLevel}>
          <SelectTrigger className="sm:w-52">
            <SelectValue placeholder="Chọn level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">Tất cả level</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <CoursesLoader skeleton={<CourseGridSkeleton count={6} />}>
        {(courses) => {
          const filtered = courses.filter((course) => {
            const q = query.trim().toLowerCase()
            const matchQuery =
              !q ||
              course.title.toLowerCase().includes(q) ||
              course.instructor.toLowerCase().includes(q) ||
              course.tags.some((tag) => tag.toLowerCase().includes(q))
            const matchLevel = level === 'All' || course.level === level
            return matchQuery && matchLevel
          })

          if (filtered.length === 0) {
            return (
              <EmptyState
                title="Không tìm thấy khóa học"
                description="Thử đổi từ khóa hoặc chọn level khác."
              />
            )
          }

          return (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Hiển thị <span className="font-semibold text-foreground">{filtered.length}</span> khóa
                học
              </p>
              <CourseGrid courses={filtered} />
            </div>
          )
        }}
      </CoursesLoader>
    </div>
  )
}
