import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-sm font-medium text-muted-foreground">Lỗi 404</p>
      <h1 className="mt-2 text-3xl font-bold leading-snug text-navy-950">Trang không tồn tại</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        URL bạn truy cập không khớp với bất kỳ route nào trong LearnHub.
      </p>
      <Button asChild className="mt-6">
        <Link to="/">Về trang chủ</Link>
      </Button>
    </div>
  )
}
