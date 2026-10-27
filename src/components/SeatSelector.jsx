import { useBooking } from '../hooks/useBooking';
import './SeatSelector.css';

// Rows configuration
const ROWS = ['A', 'B', 'C', 'D', 'E', 'F'];
const SEATS_PER_ROW = 8;

function SeatSelector({ bookedSeats = [] }) {
  const { selectedSeats, toggleSeat, pricing } = useBooking();

  // Helper to determine if a seat is Premium (Rows E & F)
  const isPremiumRow = (row) => row === 'E' || row === 'F';

  return (
    <div className="seat-selector-container">
      {/* Cinema Screen Curved Banner */}
      <div className="screen-container">
        <div className="curved-screen"></div>
        <p className="screen-label">SCREEN THIS WAY</p>
      </div>

      {/* Seating Grid */}
      <div className="seating-grid" role="group" aria-label="Cinema Seat Selection">
        {ROWS.map((row) => {
          const isVip = isPremiumRow(row);
          return (
            <div key={row} className="seat-row">
              <span className="row-label left">{row}</span>

              <div className="row-seats">
                {Array.from({ length: SEATS_PER_ROW }, (_, idx) => {
                  const seatNumber = idx + 1;
                  const seatId = `${row}${seatNumber}`;
                  const isBooked = bookedSeats.includes(seatId);
                  const isSelected = selectedSeats.includes(seatId);

                  let seatClass = 'seat';
                  if (isBooked) seatClass += ' booked';
                  else if (isSelected) seatClass += ' selected';
                  else if (isVip) seatClass += ' vip';
                  else seatClass += ' available';

                  return (
                    <button
                      key={seatId}
                      type="button"
                      className={seatClass}
                      disabled={isBooked}
                      onClick={() => toggleSeat(seatId)}
                      aria-label={`Seat ${seatId} ${isVip ? 'VIP' : 'Standard'} ${
                        isBooked ? 'Booked' : isSelected ? 'Selected' : 'Available'
                      }`}
                      title={
                        isBooked
                          ? `Seat ${seatId} (Occupied)`
                          : `Seat ${seatId} ${isVip ? '(VIP - ₹' + Math.round(pricing.basePrice * 1.35) + ')' : '(Standard - ₹' + pricing.basePrice + ')'}`
                      }
                    >
                      {seatNumber}
                    </button>
                  );
                })}
              </div>

              <span className="row-label right">{row}</span>
            </div>
          );
        })}
      </div>

      {/* Visual Legend */}
      <div className="seat-legend">
        <div className="legend-item">
          <span className="legend-seat available"></span>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <span className="legend-seat vip"></span>
          <span>VIP (Rows E-F)</span>
        </div>
        <div className="legend-item">
          <span className="legend-seat selected"></span>
          <span>Selected</span>
        </div>
        <div className="legend-item">
          <span className="legend-seat booked"></span>
          <span>Booked</span>
        </div>
      </div>

      {/* Real-time selection summary bar */}
      <div className="selection-summary">
        <div className="selected-seats-info">
          <span className="summary-title">Selected Seats:</span>
          {selectedSeats.length > 0 ? (
            <div className="seat-chips-list">
              {selectedSeats.map((seat) => (
                <span key={seat} className="seat-chip">
                  {seat}
                </span>
              ))}
            </div>
          ) : (
            <span className="no-seats-text">Please click seats on the map above (max 8)</span>
          )}
        </div>

        <div className="live-pricing-bar">
          <div className="price-item">
            <span className="price-label">Tickets:</span>
            <span className="price-val">{selectedSeats.length}</span>
          </div>
          <div className="price-item total">
            <span className="price-label">Est. Total:</span>
            <span className="price-val">₹{pricing.totalAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeatSelector;
