import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { DEMO_PASSWORD, DEMO_USERS } from '../data/courses'
import { persistAuthSession, readAuthSession } from '../store/persist'
import type { AuthState, User } from '../types/auth'

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => readAuthSession<User>())

  const login = useCallback(async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 450))

    const normalized = email.trim().toLowerCase()
    const found = DEMO_USERS.find((item) => item.email === normalized)

    if (!found || password !== DEMO_PASSWORD) {
      throw new Error('Email hoặc mật khẩu không đúng. Thử student@lms.com / 123456')
    }

    setUser(found)
    persistAuthSession(found)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    persistAuthSession(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      isLoggedIn: Boolean(user),
      user,
      login,
      logout,
    }),
    [user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
