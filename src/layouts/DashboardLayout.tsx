import {
  BookMarked,
  ChevronsLeft,
  ChevronsRight,
  Compass,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'

const SIDEBAR_KEY = 'learnhub-sidebar-collapsed'

const links = [
  { to: '/dashboard', label: 'Tổng quan', icon: LayoutDashboard, end: true },
  { to: '/dashboard/my-courses', label: 'Khóa học của tôi', icon: BookMarked },
  { to: '/courses', label: 'Khám phá khóa học', icon: Compass },
  { to: '/', label: 'Về trang chủ', icon: Home },
]

function pageTitle(pathname: string) {
  if (pathname.startsWith('/dashboard/my-courses')) return 'Khóa học của tôi'
  if (pathname.startsWith('/dashboard')) return 'Tổng quan học tập'
  return 'Dashboard'
}

export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem(SIDEBAR_KEY) === '1'
    } catch {
      return false
    }
  })
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(SIDEBAR_KEY, collapsed ? '1' : '0')
  }, [collapsed])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!mobileOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [mobileOpen])

  return (
    <div className="flex h-dvh min-h-[100vh] overflow-hidden bg-[#f4f6fb]">
      {mobileOpen ? (
        <button
          type="button"
          aria-label="Đóng menu"
          className="fixed inset-0 z-40 bg-navy-950/50 backdrop-blur-[2px] lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex h-dvh min-h-[100vh] w-[260px] flex-col bg-navy-950 text-white transition-all duration-300 ease-out',
          'lg:static lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
          collapsed ? 'lg:w-[80px]' : 'lg:w-[260px]',
        )}
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 px-4">
          <div className={cn('min-w-0', collapsed && 'lg:hidden')}>
            <p className="truncate text-sm font-bold">LearnHub</p>
            <p className="truncate text-[11px] text-blue-200/70">Khu vực học tập</p>
          </div>
          <div
            className={cn(
              'hidden h-9 w-9 place-items-center rounded-xl bg-primary text-sm font-bold lg:grid',
              !collapsed && 'lg:hidden',
            )}
          >
            L
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 hover:text-white lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className={cn('px-3 pt-4', collapsed && 'lg:px-2')}>
          <div
            className={cn(
              'rounded-xl bg-white/5 p-3 ring-1 ring-white/10',
              collapsed && 'lg:flex lg:justify-center lg:p-2',
            )}
          >
            <div
              className={cn(
                'grid h-9 w-9 place-items-center rounded-full bg-primary/90 text-sm font-bold',
                !collapsed && 'mb-2',
              )}
            >
              {(user?.name ?? 'U').charAt(0).toUpperCase()}
            </div>
            <div className={cn(collapsed && 'lg:hidden')}>
              <p className="truncate text-sm font-semibold">{user?.name}</p>
              <p className="mt-0.5 truncate text-xs text-blue-100/70">{user?.email}</p>
            </div>
          </div>
        </div>

        <nav className={cn('mt-4 flex-1 space-y-1 overflow-y-auto px-3 pb-4', collapsed && 'lg:px-2')}>
          {links.map((link) => {
            const Icon = link.icon
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                title={link.label}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition',
                    collapsed && 'lg:justify-center lg:px-0',
                    isActive
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'text-blue-100/80 hover:bg-white/5 hover:text-white',
                  )
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className={cn(collapsed && 'lg:hidden')}>{link.label}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className={cn('shrink-0 border-t border-white/10 p-3', collapsed && 'lg:px-2')}>
          <Button
            variant="outline"
            className={cn(
              'w-full border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white',
              collapsed && 'lg:px-0',
            )}
            onClick={logout}
            title="Đăng xuất"
          >
            <LogOut className="h-4 w-4" />
            <span className={cn(collapsed && 'lg:hidden')}>Đăng xuất</span>
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border bg-white px-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Mở menu"
            >
              <Menu className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="hidden lg:inline-flex"
              onClick={() => setCollapsed((value) => !value)}
              aria-label={collapsed ? 'Mở rộng sidebar' : 'Thu gọn sidebar'}
            >
              {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
            </Button>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold leading-snug text-navy-950 sm:text-base">
                {pageTitle(location.pathname)}
              </p>
              <p className="hidden truncate text-xs text-muted-foreground sm:block">
                Khu vực học tập cá nhân
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground md:block">
              {user?.email}
            </div>
            <Button variant="outline" size="sm" className="lg:hidden" onClick={logout}>
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Đăng xuất</span>
            </Button>
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-6xl p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
