import { createContext } from 'react';

/**
 * ============================================================================
 * BookingContext — Session / Transient State Context
 * ============================================================================
 * WHY WE USE CONTEXT API HERE:
 * 1. Scope: Context API manages active, in-flight booking session state
 *    (the movie currently being booked, selected show date, selected showtime,
 *    seats clicked in the current session, customer form draft, and current wizard step).
 * 2. Separation of Concerns:
 *    - Context API: Handles ephemeral UI state and user inputs during the active
 *      booking journey without polluting global Redux with high-frequency seat clicks.
 *    - Redux Toolkit: Handles persistent, committed global application state
 *      (confirmed bookings history, cancellation status, seat occupancy across shows,
 *      and favourites list persisted in localStorage).
 * 3. Prevents prop-drilling between SeatSelector, BookingForm, and Booking Summary.
 * ============================================================================
 */
export const BookingContext = createContext(null);

export default BookingContext;
