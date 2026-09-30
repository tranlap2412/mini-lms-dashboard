import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { persistFavorites, readFavorites } from '../persist'

interface FavoritesState {
  ids: string[]
}

const initialState: FavoritesState = {
  ids: readFavorites(),
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const id = action.payload
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((item) => item !== id)
      } else {
        state.ids.push(id)
      }
      persistFavorites(state.ids)
    },
    clearFavorites(state) {
      state.ids = []
      persistFavorites(state.ids)
    },
  },
})

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer
