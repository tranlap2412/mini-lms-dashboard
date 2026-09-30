export interface Course {
  id: string
  title: string
  description: string
  longDescription: string
  instructor: string
  category: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  lessons: number
  students: number
  rating: number
  price: number
  thumbnail: string
  tags: string[]
}

export type CoursesStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
