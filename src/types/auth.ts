export interface User {
  id: string
  name: string
  email: string
  enrolledCourseIds: string[]
}

export interface AuthState {
  isLoggedIn: boolean
  user: User | null
}
