import { createSlice } from '@reduxjs/toolkit';

// Sample initial booking for demonstration on first load
const sampleInitialBookings = [
  {
    id: 'booking_sample_1',
    reference: 'CB-742918',
    movieId: 1,
    movieTitle: 'Interstellar',
    moviePoster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    genre: 'Sci-Fi',
    language: 'English',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    showtime: '06:00 PM',
    seats: ['D4', 'D5'],
    seatCount: 2,
    ticketPrice: 250,
    subtotal: 500,
    convenienceFee: 40,
    totalAmount: 540,
    customer: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '9876543210',
    },
    status: 'CONFIRMED', // 'CONFIRMED' or 'CANCELLED'
    createdAt: new Date().toISOString(),
  },
];

// Safe localStorage helpers
const getStorageItem = (key, fallback) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const saved = window.localStorage.getItem(key);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(`Error reading ${key} from localStorage:`, e);
    }
  }
  return fallback;
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

// Seed booked seats for realistic cinema demonstration
const defaultBookedSeatsPerSlot = {
  defaultOccupied: ['A2', 'A3', 'C7', 'C8', 'F4', 'F5'],
};

const initialState = {
  bookings: getStorageItem('cinebook_bookings', sampleInitialBookings),
};

export const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    // Add a newly confirmed booking
    addBooking: (state, action) => {
      // Redux Toolkit uses Immer under the hood for immutable state updates
      state.bookings.unshift(action.payload);
      setStorageItem('cinebook_bookings', state.bookings);
    },
    // Cancel an existing booking
    cancelBooking: (state, action) => {
      const bookingId = action.payload;
      const target = state.bookings.find(
        (b) => b.id === bookingId || b.reference === bookingId
      );
      if (target) {
        target.status = 'CANCELLED';
        target.cancelledAt = new Date().toISOString();
        setStorageItem('cinebook_bookings', state.bookings);
      }
    },
  },
});

export const { addBooking, cancelBooking } = bookingSlice.actions;

// Selectors
export const selectAllBookings = (state) => state.bookings.bookings;

export const selectActiveBookings = (state) =>
  state.bookings.bookings.filter((b) => b.status === 'CONFIRMED');

export const selectBookingById = (state, bookingId) =>
  state.bookings.bookings.find((b) => b.id === bookingId || b.reference === bookingId);

/**
 * Returns the set of all occupied/booked seats for a given movie, date, and showtime.
 * Dynamically includes:
 * 1. Default baseline occupied seats for cinema realism.
 * 2. Seats from all CONFIRMED bookings for this exact slot.
 * If a booking was CANCELLED, its seats are immediately freed up!
 */
export const selectBookedSeatsForSlot = (state, movieId, date, showtime) => {
  const baseOccupied = new Set(defaultBookedSeatsPerSlot.defaultOccupied);

  if (!movieId || !date || !showtime) {
    return Array.from(baseOccupied);
  }

  const numMovieId = Number(movieId);

  // Find all active (CONFIRMED) bookings matching this movie, date, and showtime
  state.bookings.bookings.forEach((b) => {
    if (
      Number(b.movieId) === numMovieId &&
      b.date === date &&
      b.showtime === showtime &&
      b.status === 'CONFIRMED'
    ) {
      if (Array.isArray(b.seats)) {
        b.seats.forEach((seat) => baseOccupied.add(seat));
      }
    }
  });

  return Array.from(baseOccupied);
};

export default bookingSlice.reducer;
