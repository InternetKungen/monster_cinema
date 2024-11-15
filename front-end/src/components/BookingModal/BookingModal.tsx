import React from "react";
import "./BookingModal.scss";

interface BookingModalProps {
  showModal: boolean;
  closeModal: () => void;
  bookingStatus: {
    success: boolean;
    message?: string;
    bookingNumber?: string;
  } | null;
  movie: {
    title: string;
  } | null;
  showtime: {
    date: string;
    time: string;
    hall: {
      hallName: string;
    };
  } | null;
  selectedSeats: string[];
  seats: Array<{
    _id: string;
    seat: {
      rowNumber: number;
      seatNumber: number;
    };
  }>;
  ticketCounts: Record<string, number>;
  totalAmount: number;
  email: string;
}

const BookingModal: React.FC<BookingModalProps> = ({
  showModal,
  closeModal,
  bookingStatus,
  movie,
  showtime,
  selectedSeats,
  seats,
  ticketCounts,
  totalAmount,
  email,
}) => {
  if (!showModal) return null;

  const getSelectedSeatsInfo = () => {
    return selectedSeats.map((seatId) => {
      const seat = seats.find((s) => s._id === seatId)?.seat;
      return seat ? `Rad ${seat.rowNumber}, Plats ${seat.seatNumber}` : "";
    });
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("sv-SE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="booking-modal">
      <div className="booking-modal-content">
        {bookingStatus?.success ? (
          <>
            <div className="modal-header">
              <h2>Bokningsbekräftelse</h2>
            </div>

            <div className="modal-body">
              <div className="movie-info">
                <h3>{movie?.title}</h3>
                <p>Datum: {showtime && formatDate(showtime.date)}</p>
                <p>Tid: {showtime?.time}</p>
                <p>Salong: {showtime?.hall.hallName}</p>
              </div>

              <div className="seats-info">
                <h4>Valda platser:</h4>
                <div className="seat-list">
                  {getSelectedSeatsInfo().map((seatInfo, index) => (
                    <div key={index} className="seat-item">
                      {seatInfo}
                    </div>
                  ))}
                </div>
              </div>

              <div className="tickets-info">
                <h4>Biljetter:</h4>
                <div className="ticket-list">
                  {Object.entries(ticketCounts).map(
                    ([type, count]) =>
                      count > 0 && (
                        <div key={type} className="ticket-item">
                          <span>
                            {count}x {type}
                          </span>
                        </div>
                      )
                  )}
                </div>
                <div className="total-amount">
                  <span>Totalt:</span>
                  <span>{totalAmount} kr</span>
                </div>
              </div>

              <div className="booking-number">
                <p>Ditt bokningsnummer:</p>
                <h3>{bookingStatus.bookingNumber}</h3>
                <p className="email-info">
                  En bekräftelse har skickats till {email}
                </p>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={closeModal}>Stäng</button>
            </div>
          </>
        ) : (
          <>
            <div className="modal-header">
              <h2>Ett fel uppstod</h2>
            </div>
            <div className="modal-body">
              <p>{bookingStatus?.message}</p>
            </div>
            <div className="modal-footer">
              <button onClick={closeModal}>Stäng</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
