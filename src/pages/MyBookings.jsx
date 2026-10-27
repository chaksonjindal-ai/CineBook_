import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllBookings, cancelBooking } from '../store/bookingSlice';
import './MyBookings.css';

function MyBookings() {
  const dispatch = useDispatch();
  const bookings = useSelector(selectAllBookings);
  const [filterTab, setFilterTab] = useState('ALL'); // 'ALL' | 'CONFIRMED' | 'CANCELLED'
  const [cancellingId, setCancellingId] = useState(null);

  // Filter bookings according to active tab
  const filteredBookings = bookings.filter((b) => {
    if (filterTab === 'ALL') return true;
    return b.status === filterTab;
  });

  const handleCancelClick = (booking) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to cancel booking ${booking.reference} for "${booking.movieTitle}"?\n\nYour booked seats (${booking.seats.join(', ')}) will be released immediately.`
    );

    if (isConfirmed) {
      setCancellingId(booking.id);
      dispatch(cancelBooking(booking.id));
      setTimeout(() => {
        setCancellingId(null);
      }, 300);
    }
  };

  return (
    <div className="my-bookings-page">
      <div className="bookings-container">
        {/* Page Header */}
        <div className="bookings-header">
          <div>
            <h1>🎟️ My Cinema Bookings</h1>
            <p>Review your active e-tickets, show details, or manage cancellations.</p>
          </div>

          {/* Filter Tabs */}
          <div className="filter-tabs" role="tablist">
            <button
              className={`tab-btn ${filterTab === 'ALL' ? 'active' : ''}`}
              onClick={() => setFilterTab('ALL')}
            >
              All ({bookings.length})
            </button>
            <button
              className={`tab-btn ${filterTab === 'CONFIRMED' ? 'active' : ''}`}
              onClick={() => setFilterTab('CONFIRMED')}
            >
              Confirmed ({bookings.filter((b) => b.status === 'CONFIRMED').length})
            </button>
            <button
              className={`tab-btn ${filterTab === 'CANCELLED' ? 'active' : ''}`}
              onClick={() => setFilterTab('CANCELLED')}
            >
              Cancelled ({bookings.filter((b) => b.status === 'CANCELLED').length})
            </button>
          </div>
        </div>

        {/* Bookings List or Empty State */}
        {filteredBookings.length === 0 ? (
          <div className="empty-bookings-box">
            <span className="empty-ticket-icon">🎟️</span>
            <h3>No {filterTab !== 'ALL' ? filterTab.toLowerCase() : ''} bookings found</h3>
            <p>You don't have any bookings in this section yet. Discover exciting movies now!</p>
            <Link to="/movies" className="browse-movies-cta">
              Browse Movies & Book Now
            </Link>
          </div>
        ) : (
          <div className="tickets-grid">
            {filteredBookings.map((b) => {
              const isCancelled = b.status === 'CANCELLED';
              return (
                <div
                  key={b.id || b.reference}
                  className={`ticket-card ${isCancelled ? 'ticket-cancelled' : ''}`}
                >
                  {/* Left Ticket Stub (Poster + Quick Meta) */}
                  <div className="ticket-stub">
                    <img src={b.moviePoster} alt={b.movieTitle} className="ticket-poster" />
                    <div className="stub-info">
                      <span className="stub-genre">{b.genre}</span>
                      <span className="stub-lang">{b.language}</span>
                    </div>
                  </div>

                  {/* Main Ticket Body */}
                  <div className="ticket-body">
                    <div className="ticket-top-row">
                      <div>
                        <span className="ticket-reference-tag">Ref: {b.reference}</span>
                        <h2 className="ticket-movie-title">{b.movieTitle}</h2>
                      </div>
                      <span className={`status-pill ${isCancelled ? 'cancelled' : 'confirmed'}`}>
                        {isCancelled ? 'Cancelled' : 'Confirmed'}
                      </span>
                    </div>

                    <div className="ticket-info-grid">
                      <div className="info-cell">
                        <span className="label">Date & Showtime</span>
                        <span className="val highlight-date">
                          📅 {b.date} • 🕒 {b.showtime}
                        </span>
                      </div>

                      <div className="info-cell">
                        <span className="label">Seats ({b.seatCount || b.seats?.length})</span>
                        <span className="val highlight-seats">
                          💺 {Array.isArray(b.seats) ? b.seats.join(', ') : b.seats}
                        </span>
                      </div>

                      <div className="info-cell">
                        <span className="label">Booked For</span>
                        <span className="val">
                          👤 {b.customer?.name} ({b.customer?.phone})
                        </span>
                      </div>

                      <div className="info-cell">
                        <span className="label">Total Paid</span>
                        <span className="val highlight-price">₹{b.totalAmount}</span>
                      </div>
                    </div>

                    {/* Ticket Footer Row */}
                    <div className="ticket-footer-row">
                      <span className="booked-timestamp">
                        Booked on {new Date(b.createdAt).toLocaleDateString()} at{' '}
                        {new Date(b.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>

                      {!isCancelled ? (
                        <button
                          className="cancel-booking-btn"
                          disabled={cancellingId === b.id}
                          onClick={() => handleCancelClick(b)}
                          title="Cancel this booking and release seats"
                        >
                          Cancel Booking
                        </button>
                      ) : (
                        <span className="cancelled-note">
                          Seats released to cinema
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
