import { BookOpen, Heart, LayoutDashboard, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import {
  FacebookIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from '@/components/common/SocialIcons'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'

const links = [
  { to: '/', label: 'Trang chủ', end: true },
  { to: '/courses', label: 'Khóa học' },
  { to: '/favorites', label: 'Yêu thích' },
  { to: '/dashboard', label: 'Học tập' },
]

export default function MainLayout() {
  const { isLoggedIn, user, logout } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-[100vh] min-h-dvh flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-white shadow-sm">
              <BookOpen className="h-4 w-4" />
            </span>
            <div>
              <p className="text-base font-bold leading-none text-navy-950">LearnHub</p>
              <p className="mt-0.5 text-[11px] font-medium text-muted-foreground">Mini LMS</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  cn(
                    'rounded-lg px-3 py-2 text-sm font-semibold transition',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <Link
                  to="/favorites"
                  className="hidden rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground sm:inline-flex"
                  aria-label="Yêu thích"
                >
                  <Heart className="h-4 w-4" />
                </Link>
                <Link
                  to="/dashboard"
                  className="hidden items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm font-medium hover:bg-muted sm:inline-flex"
                >
                  <LayoutDashboard className="h-4 w-4 text-primary" />
                  <span className="max-w-[120px] truncate">{user?.name}</span>
                </Link>
                <Button variant="outline" size="sm" onClick={logout} className="hidden sm:inline-flex">
                  <LogOut className="h-4 w-4" />
                  Đăng xuất
                </Button>
              </>
            ) : (
              <Button asChild size="sm">
                <Link to="/login">Đăng nhập</Link>
              </Button>
            )}

            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-label="Menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {open ? (
          <div className="border-t border-border px-4 py-3 md:hidden">
            <nav className="flex flex-col gap-1">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'rounded-lg px-3 py-2.5 text-sm font-semibold',
                      isActive ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    logout()
                  }}
                  className="rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-foreground hover:bg-muted"
                >
                  Đăng xuất
                </button>
              ) : null}
            </nav>
          </div>
        ) : null}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-auto border-t border-border bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-base font-bold text-navy-950">LearnHub · Mini LMS</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Nền tảng học tập demo — React Router · Context · Redux Toolkit
              </p>
            </div>
            <div className="flex items-center gap-2">
              {[
                { label: 'Facebook', href: 'https://facebook.com', icon: FacebookIcon },
                { label: 'YouTube', href: 'https://youtube.com', icon: YoutubeIcon },
                { label: 'LinkedIn', href: 'https://linkedin.com', icon: LinkedinIcon },
                { label: 'Twitter', href: 'https://x.com', icon: TwitterIcon },
                { label: 'GitHub', href: 'https://github.com', icon: GithubIcon },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>
          <div className="border-t border-border pt-4 text-xs text-muted-foreground">
            © {new Date().getFullYear()} LearnHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
