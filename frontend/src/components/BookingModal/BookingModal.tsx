import React from "react";
import "./BookingModal.scss";
import dateIcon from "../../assets/icons/calendar_today_35dp_FCAF00_FILL0_wght400_GRAD0_opsz40.png";
import timeIcon from "../../assets/icons/schedule_35dp_FCAF00_FILL0_wght400_GRAD0_opsz40.png";
import hallIcon from "../../assets/icons/icon-cinema-fatter.png";

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
            <div className="booking-modal-content__modal-header">
              <h2>Bokningsbekräftelse</h2>
            </div>

            <div className="booking-modal-content__modal-body">
              <div className="booking-modal-content__modal-body__movie-info">
                <h3>{movie?.title}</h3>

                <p>
                  <img
                    className="movie-info-icon"
                    src={dateIcon}
                    alt="date icon"
                  ></img>
                  <span className="movie-info-label">Datum: </span>
                  <div className="movie-info-date-text">
                    {showtime && formatDate(showtime.date)}
                  </div>
                </p>
                <p>
                  <img
                    className="movie-info-icon"
                    src={timeIcon}
                    alt="time icon"
                  ></img>
                  <span className="movie-info-label">Tid: </span>
                  kl. {showtime?.time}
                </p>
                <p>
                  <img
                    className="movie-info-icon"
                    src={hallIcon}
                    alt="hall icon"
                  ></img>
                  <span className="movie-info-label">Salong: </span>
                  {showtime?.hall.hallName}
                </p>
              </div>

              <div className="booking-modal-content__modal-body__seats-info">
                <h4>Valda platser:</h4>
                <div className="seat-list">
                  {getSelectedSeatsInfo().map((seatInfo, index) => (
                    <div key={index} className="seat-item">
                      {seatInfo}
                    </div>
                  ))}
                </div>
              </div>

              <div className="booking-modal-content__modal-body__tickets-info">
                <div className="ticket-header">
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
                </div>
                <div className="tickets-info-total-amount">
                  <span>Att betala:</span>
                  <span>{totalAmount} kr</span>
                </div>
              </div>

              <div className="booking-modal-content__modal-body__booking-number">
                <p>Ditt bokningsnummer:</p>
                <h3>{bookingStatus.bookingNumber}</h3>
                <p className="email-info">
                  En bekräftelse har skickats till {email}
                </p>
              </div>
            </div>

            <div className="booking-modal-content__modal-footer">
              <button onClick={closeModal}>Stäng</button>
            </div>
          </>
        ) : (
          <>
            <div className="booking-modal-content__modal-header">
              <h2>Ett fel uppstod</h2>
            </div>
            <div className="booking-modal-content__modal-body">
              <p>{bookingStatus?.message}</p>
            </div>
            <div className="booking-modal-content__modal-footer">
              <button
                className="booking-modal-content__modal-footer__close"
                onClick={closeModal}
                type="button"
              >
                Stäng
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
