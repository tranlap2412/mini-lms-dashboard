import type { Course } from '../types/course'
import type { User } from '../types/auth'

export const MOCK_COURSES: Course[] = [
  {
    id: 'react-fundamentals',
    title: 'React Fundamentals',
    description: 'Nắm vững JSX, component, props và state để xây dựng UI hiện đại.',
    longDescription:
      'Khóa học giúp bạn hiểu cốt lõi của React: tạo function component, truyền props, quản lý state cục bộ, render list với key và xử lý sự kiện. Phù hợp cho người mới bắt đầu muốn xây SPA đầu tiên.',
    instructor: 'Nguyen Minh An',
    category: 'Frontend',
    level: 'Beginner',
    duration: '8 giờ',
    lessons: 24,
    students: 1820,
    rating: 4.8,
    price: 0,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    tags: ['React', 'JSX', 'Hooks'],
  },
  {
    id: 'react-router-spa',
    title: 'React Router & SPA',
    description: 'Thiết kế routing, nested layout và protected route cho ứng dụng thực tế.',
    longDescription:
      'Học cách tổ chức public/private layout, nested routes với Outlet, dynamic params và xử lý trang 404. Bạn sẽ hiểu cách SPA điều hướng không reload trang.',
    instructor: 'Tran Ha My',
    category: 'Frontend',
    level: 'Intermediate',
    duration: '6 giờ',
    lessons: 18,
    students: 960,
    rating: 4.7,
    price: 19,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    tags: ['Router', 'SPA', 'Layout'],
  },
  {
    id: 'state-management',
    title: 'State Management Mastery',
    description: 'Phân biệt local state, Context API và Redux Toolkit trong dự án thật.',
    longDescription:
      'Khóa học đi sâu vào khi nào dùng useState, Context hay Redux. Bạn sẽ thực hành AuthContext, favorites slice và theo dõi data flow với Redux DevTools.',
    instructor: 'Le Quoc Bao',
    category: 'Frontend',
    level: 'Intermediate',
    duration: '10 giờ',
    lessons: 28,
    students: 1340,
    rating: 4.9,
    price: 29,
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
    tags: ['Context', 'Redux', 'Toolkit'],
  },
  {
    id: 'typescript-react',
    title: 'TypeScript for React',
    description: 'Gõ kiểu props, state và async data để code an toàn hơn.',
    longDescription:
      'Áp dụng TypeScript vào React: interface cho Course/User, typing hooks, typing Redux slice và tránh lỗi runtime phổ biến khi làm việc với params URL.',
    instructor: 'Pham Thao Linh',
    category: 'Frontend',
    level: 'Intermediate',
    duration: '7 giờ',
    lessons: 20,
    students: 1105,
    rating: 4.6,
    price: 24,
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    tags: ['TypeScript', 'React', 'Safety'],
  },
  {
    id: 'ui-ux-dashboard',
    title: 'Dashboard UI Patterns',
    description: 'Xây layout dashboard responsive với sidebar, card và empty state.',
    longDescription:
      'Tập trung vào UX cơ bản cho LMS: loading, empty, disabled button, active NavLink và bố cục mobile/desktop. Không cần animation phức tạp nhưng phải rõ ràng.',
    instructor: 'Doan Viet Hung',
    category: 'Design',
    level: 'Beginner',
    duration: '5 giờ',
    lessons: 14,
    students: 780,
    rating: 4.5,
    price: 15,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    tags: ['UI', 'Responsive', 'UX'],
  },
  {
    id: 'async-data-flow',
    title: 'Async Data & Side Effects',
    description: 'Giả lập fetch bằng Promise/thunk, xử lý loading và error state.',
    longDescription:
      'Bạn sẽ tạo createAsyncThunk để load courses, gắn useEffect đúng chỗ, phân biệt idle/loading/success/error và tránh infinite loop dependency.',
    instructor: 'Vu Minh Chau',
    category: 'Frontend',
    level: 'Advanced',
    duration: '9 giờ',
    lessons: 22,
    students: 640,
    rating: 4.8,
    price: 35,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    tags: ['Thunk', 'useEffect', 'Async'],
  },
  {
    id: 'portfolio-react',
    title: 'React Portfolio Project',
    description: 'Đóng gói sản phẩm: README, build, deploy và storytelling phỏng vấn.',
    longDescription:
      'Hoàn thiện Mini LMS thành portfolio: dọn code, chuẩn hóa naming, kiểm tra auth flow khi reload và chuẩn bị demo trên Vercel/Netlify.',
    instructor: 'Hoang Gia Khanh',
    category: 'Career',
    level: 'Beginner',
    duration: '4 giờ',
    lessons: 12,
    students: 1520,
    rating: 4.7,
    price: 0,
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    tags: ['Portfolio', 'Deploy', 'README'],
  },
  {
    id: 'tailwind-practical',
    title: 'Tailwind CSS Practical',
    description: 'Dựng giao diện LMS nhanh với utility classes và responsive breakpoints.',
    longDescription:
      'Áp dụng Tailwind để dựng header, course grid, login form và dashboard sidebar. Học cách giữ visual nhất quán mà không viết CSS thủ công dài dòng.',
    instructor: 'Ngo Bao Tram',
    category: 'Frontend',
    level: 'Beginner',
    duration: '6 giờ',
    lessons: 16,
    students: 990,
    rating: 4.6,
    price: 12,
    thumbnail: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80',
    tags: ['Tailwind', 'CSS', 'Layout'],
  },
]

/** Demo accounts — password is always 123456 */
export const DEMO_USERS: User[] = [
  {
    id: 'u-student',
    name: 'Hoc Vien Demo',
    email: 'student@lms.com',
    enrolledCourseIds: [
      'react-fundamentals',
      'react-router-spa',
      'state-management',
      'async-data-flow',
    ],
  },
  {
    id: 'u-guest',
    name: 'Nguyen Van A',
    email: 'guest@lms.com',
    enrolledCourseIds: ['react-fundamentals', 'ui-ux-dashboard'],
  },
]

export const DEMO_PASSWORD = '123456'

export function fetchCoursesMock(shouldFail = false): Promise<Course[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Không thể tải danh sách khóa học. Vui lòng thử lại.'))
        return
      }
      resolve(MOCK_COURSES)
    }, 700)
  })
}
