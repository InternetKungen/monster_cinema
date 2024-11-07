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
                <table className="table">
                  <thead>
                    <tr>
                      <th>Filmtitel</th>
                      <th>Bokat datum</th>
                      <th>Totalt belopp</th>
                      <th>Biljetttyper</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingHistory.map((booking) => (
                      <tr key={booking._id}>
                        <td>{booking.movie.title}</td>
                        <td>
                          {new Date(booking.bookedAt[0].date)
                            .toISOString()
                            .slice(0, 10)}
                        </td>
                        <td>{booking.totalAmount} kr</td>
                        <td>
                          {booking.tickets.map((ticket: any) => (
                            <div key={ticket._id}>
                              {ticket.quantity} st {ticket.type}
                            </div>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Inga tidigare bokningar</p>
              )}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Aktuella bokningar</Accordion.Header>
            <Accordion.Body>
              {currentBookings.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Filmtitel</th>
                      <th>Bokat datum</th>
                      <th>Totalt belopp</th>
                      <th>Biljetttyper</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentBookings.map((booking) => (
                      <tr key={booking._id}>
                        <td>{booking.movie.title}</td>
                        <td>
                          {new Date(booking.bookedAt[0].date)
                            .toISOString()
                            .slice(0, 10)}
                        </td>
                        <td>{booking.totalAmount} kr</td>
                        <td>
                          {booking.tickets.map((ticket: any) => (
                            <div key={ticket._id}>
                              {ticket.quantity} st {ticket.type}
                            </div>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
