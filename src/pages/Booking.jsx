import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import movies from '../data/movies';
import { useBooking } from '../hooks/useBooking';
import { selectBookedSeatsForSlot } from '../store/bookingSlice';
import SeatSelector from '../components/SeatSelector';
import BookingForm from '../components/BookingForm';
import './Booking.css';

function Booking() {
  const { id } = useParams();
  const {
    selectedMovie,
    startBooking,
    selectedDate,
    selectedShowtime,
  } = useBooking();

  // Find movie
  const movie = movies.find((m) => m.id === Number(id));

  // Initialize booking flow for this movie when component mounts or ID changes
  useEffect(() => {
    if (movie && (!selectedMovie || selectedMovie.id !== movie.id)) {
      startBooking(movie);
    }
  }, [movie, selectedMovie, startBooking]);

  // Query booked seats for this exact movie + date + showtime from Redux store!
  const bookedSeats = useSelector((state) =>
    movie ? selectBookedSeatsForSlot(state, movie.id, selectedDate, selectedShowtime) : []
  );

  if (!movie) {
    return (
      <div className="booking-error-container">
        <h2>Movie Not Found</h2>
        <p>Please select a valid movie from our catalog to book tickets.</p>
        <Link to="/movies" className="btn-return">
          Browse Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="booking-container">
        {/* Breadcrumb Navigation */}
        <nav className="booking-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="sep">/</span>
          <Link to="/movies">Movies</Link>
          <span className="sep">/</span>
          <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          <span className="sep">/</span>
          <span className="current">Seat & Ticket Booking</span>
        </nav>

        {/* Header Movie Bar */}
        <div className="booking-movie-banner">
          <img src={movie.image} alt={movie.title} className="banner-thumb" />
          <div className="banner-info">
            <span className="banner-badge">{movie.genre} • {movie.language}</span>
            <h1 className="banner-title">{movie.title}</h1>
            <div className="banner-meta">
              <span>⭐ {movie.rating}</span>
              <span>⏱️ {movie.duration || '2h 30m'}</span>
              <span>🎟️ Standard: ₹{movie.price || 250} • VIP: ₹{Math.round((movie.price || 250) * 1.35)}</span>
            </div>
          </div>
        </div>

        {/* Two-Column Booking Layout */}
        <div className="booking-grid">
          {/* Left Column: Interactive Cinema Seat Selection */}
          <div className="grid-left">
            <div className="column-card">
              <div className="card-header">
                <h2>💺 Cinema Seating Map</h2>
                <span className="slot-badge">
                  {selectedDate} • {selectedShowtime || 'Choose Showtime'}
                </span>
              </div>
              <SeatSelector bookedSeats={bookedSeats} />
            </div>
          </div>

          {/* Right Column: Date, Showtime, Customer Details & Summary */}
          <div className="grid-right">
            <BookingForm movie={movie} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
