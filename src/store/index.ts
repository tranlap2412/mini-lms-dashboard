import { configureStore } from '@reduxjs/toolkit'
import coursesReducer from './slices/coursesSlice'
import favoritesReducer from './slices/favoritesSlice'

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    favorites: favoritesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
