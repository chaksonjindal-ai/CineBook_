import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useBooking } from '../hooks/useBooking';
import { useAuth } from '../hooks/useAuth';
import { addBooking } from '../store/bookingSlice';
import './BookingForm.css';

function BookingForm({ movie }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const {
    selectedDate,
    setSelectedDate,
    selectedShowtime,
    setSelectedShowtime,
    selectedSeats,
    customerInfo,
    updateCustomerInfo,
    setCustomerInfo,
    pricing,
    resetBooking,
  } = useBooking();

  // Format today's date YYYY-MM-DD for min date attribute
  const todayStr = new Date().toISOString().split('T')[0];

  // Auto-populate customer info if logged in and not already filled
  useEffect(() => {
    if (user && !customerInfo.fullName && !customerInfo.email) {
      setCustomerInfo((prev) => ({
        ...prev,
        fullName: user.name || '',
        email: user.email || '',
        phone: user.phone || prev.phone,
      }));
    }
  }, [user, customerInfo.fullName, customerInfo.email, setCustomerInfo]);

  // Form errors state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    // Validate Name
    if (!customerInfo.fullName || customerInfo.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name (at least 2 characters).';
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerInfo.email || !emailRegex.test(customerInfo.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Validate Phone (10 digits)
    const cleanedPhone = customerInfo.phone ? customerInfo.phone.replace(/[\s-]/g, '') : '';
    if (!cleanedPhone || !/^\d{10}$/.test(cleanedPhone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }

    // Validate Date
    if (!selectedDate) {
      newErrors.date = 'Please select a booking date.';
    } else if (selectedDate < todayStr) {
      newErrors.date = 'Booking date cannot be in the past.';
    }

    // Validate Showtime
    if (!selectedShowtime) {
      newErrors.showtime = 'Please select a showtime.';
    }

    // Validate Seats
    if (!selectedSeats || selectedSeats.length === 0) {
      newErrors.seats = 'Please select at least one seat from the cinema layout.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    updateCustomerInfo(field, value);
    // Clear field-specific error as user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to the first error or show banner
      return;
    }

    setIsSubmitting(true);

    // Generate unique booking reference (e.g. CB-849201)
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const bookingReference = `CB-${randomDigits}`;
    const bookingId = `booking_${Date.now()}`;

    const newBooking = {
      id: bookingId,
      reference: bookingReference,
      movieId: movie.id,
      movieTitle: movie.title,
      moviePoster: movie.image,
      genre: movie.genre,
      language: movie.language,
      date: selectedDate,
      showtime: selectedShowtime,
      seats: [...selectedSeats],
      seatCount: selectedSeats.length,
      ticketPrice: pricing.basePrice,
      subtotal: pricing.subtotal,
      convenienceFee: pricing.convenienceFee,
      totalAmount: pricing.totalAmount,
      customer: {
        name: customerInfo.fullName.trim(),
        email: customerInfo.email.trim(),
        phone: customerInfo.phone.trim(),
      },
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
    };

    // Dispatch to Redux store (which auto-persists to localStorage)
    dispatch(addBooking(newBooking));

    // Show success confirmation card
    setConfirmedBooking(newBooking);
    setIsSubmitting(false);
  };

  const handleDone = () => {
    resetBooking();
    navigate('/my-bookings');
  };

  // If booking is successfully confirmed, show the Confirmation Ticket Card
  if (confirmedBooking) {
    return (
      <div className="booking-confirmed-card">
        <div className="confirmed-badge">
          <span className="check-icon">✓</span>
          <h2>Booking Confirmed!</h2>
        </div>

        <p className="confirmation-sub">
          Your tickets have been reserved successfully. A confirmation email has been dispatched to <strong>{confirmedBooking.customer.email}</strong>.
        </p>

        <div className="ticket-summary-box">
          <div className="ticket-header">
            <div>
              <span className="ticket-ref-label">Booking Reference</span>
              <div className="ticket-ref-code">{confirmedBooking.reference}</div>
            </div>
            <span className="status-tag confirmed">Confirmed</span>
          </div>

          <div className="ticket-details-grid">
            <div className="ticket-detail">
              <span className="label">Movie</span>
              <span className="value">{confirmedBooking.movieTitle}</span>
            </div>
            <div className="ticket-detail">
              <span className="label">Date & Time</span>
              <span className="value">{confirmedBooking.date} • {confirmedBooking.showtime}</span>
            </div>
            <div className="ticket-detail">
              <span className="label">Seats ({confirmedBooking.seatCount})</span>
              <span className="value seats-highlight">{confirmedBooking.seats.join(', ')}</span>
            </div>
            <div className="ticket-detail">
              <span className="label">Name</span>
              <span className="value">{confirmedBooking.customer.name}</span>
            </div>
            <div className="ticket-detail">
              <span className="label">Phone</span>
              <span className="value">{confirmedBooking.customer.phone}</span>
            </div>
            <div className="ticket-detail">
              <span className="label">Total Paid</span>
              <span className="value price-highlight">₹{confirmedBooking.totalAmount}</span>
            </div>
          </div>
        </div>

        <div className="confirmed-actions">
          <button className="btn-primary" onClick={handleDone}>
            Go to My Bookings
          </button>
          <button
            className="btn-secondary"
            onClick={() => {
              resetBooking();
              navigate('/movies');
            }}
          >
            Book Another Movie
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate>
      {/* Date and Showtime Picker */}
      <div className="form-section">
        <h3 className="section-title">1. Show Date & Time</h3>

        <div className="form-row">
          <div className="form-group flex-1">
            <label htmlFor="booking-date" className="form-label">
              Select Date *
            </label>
            <input
              id="booking-date"
              type="date"
              className={`form-input ${errors.date ? 'has-error' : ''}`}
              min={todayStr}
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                if (errors.date) setErrors((prev) => ({ ...prev, date: undefined }));
              }}
            />
            {errors.date && <span className="error-message">{errors.date}</span>}
          </div>

          <div className="form-group flex-2">
            <label className="form-label">Select Showtime *</label>
            <div className="showtimes-chips">
              {movie.showtimes && movie.showtimes.length > 0 ? (
                movie.showtimes.map((time) => (
                  <button
                    key={time}
                    type="button"
                    className={`time-chip ${selectedShowtime === time ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedShowtime(time);
                      if (errors.showtime) setErrors((prev) => ({ ...prev, showtime: undefined }));
                    }}
                  >
                    {time}
                  </button>
                ))
              ) : (
                <span className="no-shows">No showtimes available</span>
              )}
            </div>
            {errors.showtime && <span className="error-message">{errors.showtime}</span>}
          </div>
        </div>
      </div>

      {/* Seats Error Display if any */}
      {errors.seats && (
        <div className="alert-box error" role="alert">
          ⚠️ {errors.seats}
        </div>
      )}

      {/* Customer Information Section */}
      <div className="form-section">
        <h3 className="section-title">2. Customer Details</h3>

        <div className="form-group">
          <label htmlFor="customer-name" className="form-label">
            Full Name *
          </label>
          <input
            id="customer-name"
            type="text"
            className={`form-input ${errors.fullName ? 'has-error' : ''}`}
            placeholder="e.g. John Doe"
            value={customerInfo.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
          />
          {errors.fullName && <span className="error-message">{errors.fullName}</span>}
        </div>

        <div className="form-row">
          <div className="form-group flex-1">
            <label htmlFor="customer-email" className="form-label">
              Email Address *
            </label>
            <input
              id="customer-email"
              type="email"
              className={`form-input ${errors.email ? 'has-error' : ''}`}
              placeholder="e.g. john@example.com"
              value={customerInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group flex-1">
            <label htmlFor="customer-phone" className="form-label">
              Phone Number (10 digits) *
            </label>
            <input
              id="customer-phone"
              type="tel"
              className={`form-input ${errors.phone ? 'has-error' : ''}`}
              placeholder="e.g. 9876543210"
              maxLength={10}
              value={customerInfo.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>
        </div>
      </div>

      {/* Order Summary & Pricing Breakdown */}
      <div className="order-summary-box">
        <h3 className="summary-heading">Order Summary</h3>

        <div className="summary-row">
          <span>Movie</span>
          <strong>{movie.title}</strong>
        </div>

        <div className="summary-row">
          <span>Showtime</span>
          <span>{selectedDate} at {selectedShowtime || 'Not selected'}</span>
        </div>

        <div className="summary-row">
          <span>Selected Seats ({selectedSeats.length})</span>
          <span>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</span>
        </div>

        <div className="summary-divider"></div>

        <div className="summary-row">
          <span>Tickets Subtotal</span>
          <span>₹{pricing.subtotal}</span>
        </div>

        <div className="summary-row">
          <span>Convenience Fee</span>
          <span>₹{pricing.convenienceFee}</span>
        </div>

        <div className="summary-row grand-total">
          <span>Total Amount</span>
          <span className="total-price">₹{pricing.totalAmount}</span>
        </div>
      </div>

      {/* Form Submission */}
      <button
        type="submit"
        className="submit-booking-btn"
        disabled={isSubmitting || selectedSeats.length === 0}
      >
        {isSubmitting ? 'Confirming...' : `Confirm & Pay ₹${pricing.totalAmount}`}
      </button>

      {selectedSeats.length === 0 && (
        <p className="hint-text">Select at least one seat above to enable booking confirmation.</p>
      )}
    </form>
  );
}

export default BookingForm;
