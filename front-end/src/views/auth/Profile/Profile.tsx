import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../UserContext";
import Accordion from "react-bootstrap/Accordion";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./Profile.scss";

interface Ticket {
  type: string;
  quantity: number;
  price: number;
  _id: string;
}

interface Booking {
  _id: string;
  movie: {
    title: string;
    poster: string;
  };
  bookedAt: Array<{
    date: string;
    time: string;
  }>;
  hall: {
    hallName: string;
  };
  bookingNumber: string;
  tickets: Ticket[];
  totalAmount: number;
}

const Profile: React.FC = () => {
  const { user } = useContext(UserContext);
  const [bookingHistory, setBookingHistory] = useState<Booking[]>([]);
  const [currentBookings, setCurrentBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/user/tickets", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const today = new Date();

      setBookingHistory(
        data.filter(
          (booking: Booking) => new Date(booking.bookedAt[0].date) < today
        )
      );
      setCurrentBookings(
        data.filter(
          (booking: Booking) => new Date(booking.bookedAt[0].date) >= today
        )
      );
    } catch (err) {
      setError("Det gick inte att hämta bokningarna");
    }
  };

  const handleCancelBooking = async () => {
    if (!selectedBooking) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/user/remove-ticket/${selectedBooking.bookingNumber}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Kunde inte avboka biljetten");
      }

      // Refresh bookings after successful cancellation
      await fetchBookings();
      setShowCancelModal(false);
      setSelectedBooking(null);
      setExpandedBooking(null);
    } catch (err) {
      setError("Det gick inte att avboka biljetten");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookingClick = (booking: Booking) => {
    setExpandedBooking(expandedBooking === booking._id ? null : booking._id);
  };

  const handleShowCancelModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };

  return (
    <div className="profile-content">
      <h3>Välj biljett för avbokning</h3>
      <div className="accordion-container-wrapper">
        <Accordion className="p-3 g-0" alwaysOpen>
          <Accordion.Item className="accordion-item" eventKey="0">
            <Accordion.Header className="accordion-header">
              Bokningshistorik
            </Accordion.Header>
            <Accordion.Body className="accordion-body">
              {bookingHistory.length > 0 ? (
                <div className="profile__column">
                  {bookingHistory.map((booking) => (
                    <div key={booking._id} className="profile__booking">
                      <div className="profile__booking-content">
                        <div className="profile__poster">
                          <img
                            src={booking.movie.poster}
                            alt={booking.movie.title}
                            className="profile__poster-image"
                          />
                        </div>
                        <div className="profile__info">
                          <h4 className="profile__title">
                            {booking.movie.title}
                          </h4>
                          <p className="profile__details">
                            {new Date(
                              booking.bookedAt[0].date
                            ).toLocaleDateString()}
                            ,{booking.bookedAt[0].time}
                          </p>
                          <p className="profile__details">
                            {booking.hall.hallName}
                          </p>
                        </div>
                        <div className="profile__booking-number">
                          <p>#: {booking.bookingNumber}</p>
                        </div>
                        <div className="profile__booking-details">
                          <div className="profile__tickets">
                            <p>
                              Antal biljetter:{" "}
                              {booking.tickets.reduce(
                                (sum: number, ticket: any) =>
                                  sum + ticket.quantity,
                                0
                              )}
                            </p>
                            {booking.tickets.map((ticket) => (
                              <p key={ticket._id} className="profile__ticket">
                                {ticket.quantity} st {ticket.type}
                                <span className="profile__ticket__ticket-price">
                                  {ticket.price * ticket.quantity} kr
                                </span>
                              </p>
                            ))}
                            <p className="profile__total">
                              Summa: {booking.totalAmount} kr
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Inga tidigare bokningar</p>
              )}
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>Aktuella bokningar</Accordion.Header>
            <Accordion.Body>
              {currentBookings.length > 0 ? (
                <div className="profile__column">
                  {currentBookings.map((booking) => (
                    <div key={booking._id} className="profile__booking">
                      <button
                        className="profile__booking-content"
                        onClick={() => handleBookingClick(booking)}
                      >
                        <div className="profile__poster">
                          <img
                            src={booking.movie.poster}
                            alt={booking.movie.title}
                            className="profile__poster-image"
                          />
                        </div>
                        <div className="profile__info">
                          <h4 className="profile__title">
                            {booking.movie.title}
                          </h4>
                          <p className="profile__details">
                            {new Date(
                              booking.bookedAt[0].date
                            ).toLocaleDateString()}
                            ,{booking.bookedAt[0].time}
                          </p>
                          <p className="profile__details">
                            {booking.hall.hallName}
                          </p>
                        </div>
                        <div className="profile__booking-number">
                          <p>#: {booking.bookingNumber}</p>
                        </div>
                        <div className="profile__booking-details">
                          <div className="profile__tickets">
                            <p>
                              Antal biljetter:{" "}
                              {booking.tickets.reduce(
                                (sum: number, ticket: any) =>
                                  sum + ticket.quantity,
                                0
                              )}
                            </p>
                            {booking.tickets.map((ticket) => (
                              <p key={ticket._id} className="profile__ticket">
                                {ticket.quantity} st {ticket.type}
                                <span className="profile__ticket__ticket-price">
                                  {ticket.price * ticket.quantity} kr
                                </span>
                              </p>
                            ))}
                            <p className="profile__total">
                              Summa: {booking.totalAmount} kr
                            </p>
                          </div>
                        </div>
                      </button>
                      {expandedBooking === booking._id && (
                        <button
                          className="cancel-button"
                          onClick={() => handleShowCancelModal(booking)}
                        >
                          Avboka
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p>Inga aktuella bokningar</p>
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>

      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Avboka biljett</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBooking && (
            <>
              <h5>Är du säker på att du vill avboka denna biljett?</h5>
              <p>Film: {selectedBooking.movie.title}</p>
              <p>
                Datum:{" "}
                {new Date(
                  selectedBooking.bookedAt[0].date
                ).toLocaleDateString()}
                ,{selectedBooking.bookedAt[0].time}
              </p>
              <p>Bokningsnummer: {selectedBooking.bookingNumber}</p>
              {error && <p className="error-message">{error}</p>}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            Avbryt
          </Button>
          <Button
            variant="danger"
            onClick={handleCancelBooking}
            disabled={isLoading}
          >
            {isLoading ? "Avbokar..." : "Avboka"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
