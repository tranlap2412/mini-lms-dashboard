import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/AuthContext'

export default function LoginPage() {
  const { isLoggedIn, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/dashboard'

  const [email, setEmail] = useState('student@lms.com')
  const [password, setPassword] = useState('123456')
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({})
  const [submitting, setSubmitting] = useState(false)

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />
  }

  const validate = () => {
    const next: { email?: string; password?: string } = {}
    if (!email.trim()) next.email = 'Vui lòng nhập email'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = 'Email không hợp lệ'
    if (!password) next.password = 'Vui lòng nhập mật khẩu'
    else if (password.length < 6) next.password = 'Mật khẩu tối thiểu 6 ký tự'
    setFieldErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    if (!validate()) return

    setSubmitting(true)
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng nhập thất bại')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-6xl items-center px-4 py-10 sm:px-6">
      <div className="mx-auto grid w-full max-w-4xl overflow-hidden rounded-3xl border border-border bg-white shadow-card lg:grid-cols-2">
        <div className="hidden bg-navy-950 p-8 text-white lg:block">
          <p className="text-sm font-semibold text-blue-200">LearnHub</p>
          <h2 className="mt-4 text-3xl font-bold leading-snug">
            Đăng nhập để tiếp tục lộ trình học của bạn
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-blue-100/75">
            Theo dõi khóa đã tham gia, lưu yêu thích và quản lý tiến độ ngay trên dashboard.
          </p>
        </div>

        <div className="p-6 sm:p-8">
          <h1 className="text-3xl font-bold leading-snug text-navy-950">Đăng nhập</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Demo: <strong>student@lms.com</strong> / <strong>123456</strong>
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-semibold text-foreground">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="username"
              />
              {fieldErrors.email ? (
                <p className="text-xs text-destructive">{fieldErrors.email}</p>
              ) : null}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm font-semibold text-foreground">
                Mật khẩu
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
              />
              {fieldErrors.password ? (
                <p className="text-xs text-destructive">{fieldErrors.password}</p>
              ) : null}
            </div>

            {error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Tài khoản phụ: guest@lms.com / 123456 ·{' '}
            <Link to="/" className="font-semibold text-primary hover:underline">
              Về trang chủ
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
