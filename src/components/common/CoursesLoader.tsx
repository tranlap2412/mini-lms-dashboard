import { useEffect, type ReactNode } from 'react'
import EmptyState from '@/components/common/EmptyState'
import LoadingState from '@/components/common/LoadingState'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { loadCourses } from '@/store/slices/coursesSlice'
import type { Course } from '@/types/course'

interface CoursesLoaderProps {
  children: (courses: Course[]) => ReactNode
  emptyTitle?: string
  emptyDescription?: string
  skeleton?: ReactNode
}

export default function CoursesLoader({
  children,
  emptyTitle = 'Chưa có khóa học',
  emptyDescription = 'Danh sách khóa học hiện đang trống.',
  skeleton,
}: CoursesLoaderProps) {
  const dispatch = useAppDispatch()
  const { items, status, error } = useAppSelector((state) => state.courses)

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(loadCourses())
    }
  }, [dispatch, status])

  if (status === 'idle' || status === 'loading') {
    return <>{skeleton ?? <LoadingState label="Đang tải khóa học..." />}</>
  }

  if (status === 'failed') {
    return (
      <EmptyState
        title="Không tải được dữ liệu"
        description={error ?? 'Đã xảy ra lỗi.'}
        action={
          <Button type="button" onClick={() => void dispatch(loadCourses())}>
            Thử lại
          </Button>
        }
      />
    )
  }

  if (items.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />
  }

  return <>{children(items)}</>
}
