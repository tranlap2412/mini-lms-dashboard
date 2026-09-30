import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchCoursesMock } from '../../data/courses'
import type { Course, CoursesStatus } from '../../types/course'

interface CoursesState {
  items: Course[]
  status: CoursesStatus
  error: string | null
}

const initialState: CoursesState = {
  items: [],
  status: 'idle',
  error: null,
}

export const loadCourses = createAsyncThunk(
  'courses/loadCourses',
  async (shouldFail: boolean | undefined, { rejectWithValue }) => {
    try {
      return await fetchCoursesMock(Boolean(shouldFail))
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Đã xảy ra lỗi không xác định'
      return rejectWithValue(message)
    }
  },
)

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    resetCoursesState(state) {
      state.items = []
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCourses.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadCourses.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(loadCourses.rejected, (state, action) => {
        state.status = 'failed'
        state.error = (action.payload as string) || 'Tải khóa học thất bại'
      })
  },
})

export const { resetCoursesState } = coursesSlice.actions
export default coursesSlice.reducer
