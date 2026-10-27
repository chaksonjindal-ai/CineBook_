import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from './bookingSlice';
import favouritesReducer from './favouritesSlice';

/**
 * Redux Store Configuration for CineBook
 * 
 * Redux Toolkit manages application-wide, persistent state:
 * 1. bookings: Confirmed bookings history, cancellation records, and seat occupancy calculation.
 * 2. favourites: Persisted list of favourite movie IDs.
 */
export const store = configureStore({
  reducer: {
    bookings: bookingReducer,
    favourites: favouritesReducer,
  },
});

export default store;

