const FAVORITES_KEY = 'mini-lms-favorites'

export function readFavorites(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : []
  } catch {
    return []
  }
}

export function persistFavorites(ids: string[]) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids))
}

const AUTH_KEY = 'mini-lms-auth'

export function readAuthSession<T>(): T | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

export function persistAuthSession(value: unknown | null) {
  if (value == null) {
    localStorage.removeItem(AUTH_KEY)
    return
  }
  localStorage.setItem(AUTH_KEY, JSON.stringify(value))
}
