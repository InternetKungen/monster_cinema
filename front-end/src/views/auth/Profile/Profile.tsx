import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../UserContext";
import Accordion from "react-bootstrap/Accordion";
import "./Profile.scss";

const Profile: React.FC = () => {
  const { user } = useContext(UserContext);
  const [bookingHistory, setBookingHistory] = useState<any[]>([]);
  const [currentBookings, setCurrentBookings] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetch("/api/user/tickets", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const today = new Date();
          setBookingHistory(
            data.filter(
              (booking: any) => new Date(booking.bookedAt[0].date) < today
            )
          );
          setCurrentBookings(
            data.filter(
              (booking: any) => new Date(booking.bookedAt[0].date) >= today
            )
          );
        });
    }
  }, [user]);

  return (
    <div className="profile-content">
      <h3>Välj biljett för avbokning</h3>
      <div className="accordion-container-wrapper">
        <Accordion className="p-3 g-0" alwaysOpen>
          <Accordion.Item className="accordion-item" eventKey="0">
            <Accordion.Header className="accordion-header">
              Bokningsthistorik
            </Accordion.Header>
            <Accordion.Body className="accordion-body">
              {bookingHistory.length > 0 ? (
                <div className="profile__grid">
                  {bookingHistory.map((booking) => (
                    <div key={booking._id} className="profile__booking">
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
                          , {booking.bookedAt[0].time}
                        </p>
                        <p className="profile__details">
                          {booking.hall.hallName}
                        </p>
                      </div>
                      <div className="profile__booking-number">
                        <p>Bokningsnummer: {booking.bookingNumber}</p>
                      </div>
                      <div className="profile__tickets">
                        <p>
                          Antal biljetter:{" "}
                          {booking.tickets.reduce(
                            (sum: number, ticket: any) => sum + ticket.quantity,
                            0
                          )}
                        </p>
                        {booking.tickets.map((ticket: any) => (
                          <p key={ticket._id} className="profile__ticket">
                            {ticket.quantity} st {ticket.type} -{" "}
                            {ticket.price * ticket.quantity} kr
                          </p>
                        ))}
                        <p className="profile__total">
                          Summa: {booking.totalAmount} kr
                        </p>
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
                          , {booking.bookedAt[0].time}
                        </p>
                        <p className="profile__details">
                          {booking.hall.hallName}
                        </p>
                      </div>
                      <div className="profile__booking-number">
                        <p>Bokningsnummer: {booking.bookingNumber}</p>
                      </div>
                      <div className="profile__tickets">
                        <p>
                          Antal biljetter:{" "}
                          {booking.tickets.reduce(
                            (sum: number, ticket: any) => sum + ticket.quantity,
                            0
                          )}
                        </p>
                        {booking.tickets.map((ticket: any) => (
                          <p key={ticket._id} className="profile__ticket">
                            {ticket.quantity} st {ticket.type} -{" "}
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
                  ))}
                </div>
              ) : (
                <p>Inga aktuella bokningar</p>
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default Profile;
