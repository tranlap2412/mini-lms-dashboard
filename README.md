# Mini LMS Dashboard

SPA học trực tuyến đơn giản (LearnHub) — React Router, Context API, Redux Toolkit.

## Tính năng

- Public: Home, Courses, Course Detail, Favorites, Login
- Private: Dashboard tổng quan, My Courses
- Auth giả lập bằng Context API (persist localStorage)
- Favorites đồng bộ bằng Redux Toolkit
- Courses load async qua `createAsyncThunk` (loading / skeleton / error)

## Tech stack

- Vite + React 19 + TypeScript
- React Router DOM
- Redux Toolkit + React Redux
- Tailwind CSS
- UI components kiểu shadcn (Button, Input, Select, Badge, Progress, Skeleton)

## Chạy local

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

## Tài khoản demo

| Email | Password |
|-------|----------|
| `student@lms.com` | `123456` |
| `guest@lms.com` | `123456` |

## Cấu trúc

```text
src/
  components/
    common/
    course/
    ui/
  contexts/
  data/
  layouts/
  lib/
  pages/
  store/
  types/
```

## Routes

| Path | Auth |
|------|------|
| `/` | Public |
| `/courses` | Public |
| `/courses/:id` | Public |
| `/favorites` | Public |
| `/login` | Public |
| `/dashboard` | Private |
| `/dashboard/my-courses` | Private |
