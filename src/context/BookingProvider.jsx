import { useState, useMemo } from 'react';
import BookingContext from './BookingContext';

export function BookingProvider({ children }) {
  // Format today as YYYY-MM-DD
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  // In-flight booking workflow state
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
  });
  const [step, setStep] = useState(1); // Step 1: Seats & Show, Step 2: Info & Review, Step 3: Confirmation

  // Initialize booking session for a given movie
  const startBooking = (movie, defaultShowtime = '') => {
    setSelectedMovie(movie);
    setSelectedDate(todayStr);
    setSelectedShowtime(defaultShowtime || (movie?.showtimes ? movie.showtimes[0] : ''));
    setSelectedSeats([]);
    setStep(1);
  };

  // Toggle seat selection (enforces max 8 seats per booking, prevents duplicates)
  const toggleSeat = (seatId) => {
    setSelectedSeats((prevSeats) => {
      if (prevSeats.includes(seatId)) {
        return prevSeats.filter((s) => s !== seatId);
      }
      if (prevSeats.length >= 8) {
        alert('You can select a maximum of 8 seats per booking.');
        return prevSeats;
      }
      return [...prevSeats, seatId].sort();
    });
  };

  // Clear chosen seats
  const clearSeats = () => {
    setSelectedSeats([]);
  };

  // Update customer form fields
  const updateCustomerInfo = (field, value) => {
    setCustomerInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Reset entire booking session
  const resetBooking = () => {
    setSelectedMovie(null);
    setSelectedDate(todayStr);
    setSelectedShowtime('');
    setSelectedSeats([]);
    setCustomerInfo({ fullName: '', email: '', phone: '' });
    setStep(1);
  };

  // Pricing calculations
  // Rows E & F are Premium / VIP (₹350), Rows A-D are Standard (₹250 or movie.price)
  const calculatePricing = useMemo(() => {
    const basePrice = selectedMovie?.price || 250;
    let subtotal = 0;

    selectedSeats.forEach((seat) => {
      const row = seat.charAt(0);
      if (row === 'E' || row === 'F') {
        subtotal += Math.round(basePrice * 1.35); // 35% premium for VIP rows
      } else {
        subtotal += basePrice;
      }
    });

    const convenienceFee = selectedSeats.length > 0 ? selectedSeats.length * 20 : 0;
    const totalAmount = subtotal + convenienceFee;

    return {
      basePrice,
      seatCount: selectedSeats.length,
      subtotal,
      convenienceFee,
      totalAmount,
    };
  }, [selectedMovie, selectedSeats]);

  const value = {
    selectedMovie,
    setSelectedMovie,
    selectedDate,
    setSelectedDate,
    selectedShowtime,
    setSelectedShowtime,
    selectedSeats,
    toggleSeat,
    clearSeats,
    customerInfo,
    setCustomerInfo,
    updateCustomerInfo,
    step,
    setStep,
    startBooking,
    resetBooking,
    pricing: calculatePricing,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export default BookingProvider;
