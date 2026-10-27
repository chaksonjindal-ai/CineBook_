import { createSlice } from '@reduxjs/toolkit';

// Safe localStorage helper
const getStorageItem = (key) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const saved = window.localStorage.getItem(key);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(`Error reading ${key} from localStorage:`, e);
    }
  }
  return null;
};

const setStorageItem = (key, value) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error writing ${key} to localStorage:`, e);
    }
  }
};

const initialState = {
  favouriteIds: getStorageItem('cinebook_favourites') || [1, 3], // Default demo favourites
};

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    // Toggle favourite status: add if not present, remove if present
    toggleFavourite: (state, action) => {
      const movieId = Number(action.payload);
      const index = state.favouriteIds.indexOf(movieId);
      if (index >= 0) {
        state.favouriteIds.splice(index, 1);
      } else {
        state.favouriteIds.push(movieId);
      }
      setStorageItem('cinebook_favourites', state.favouriteIds);
    },
    // Explicitly add favourite
    addFavourite: (state, action) => {
      const movieId = Number(action.payload);
      if (!state.favouriteIds.includes(movieId)) {
        state.favouriteIds.push(movieId);
        setStorageItem('cinebook_favourites', state.favouriteIds);
      }
    },
    // Explicitly remove favourite
    removeFavourite: (state, action) => {
      const movieId = Number(action.payload);
      state.favouriteIds = state.favouriteIds.filter((id) => id !== movieId);
      setStorageItem('cinebook_favourites', state.favouriteIds);
    },
  },
});

export const { toggleFavourite, addFavourite, removeFavourite } = favouritesSlice.actions;

// Selectors
export const selectFavouriteIds = (state) => state.favourites.favouriteIds;
export const selectIsFavourite = (state, movieId) =>
  state.favourites.favouriteIds.includes(Number(movieId));

export default favouritesSlice.reducer;

