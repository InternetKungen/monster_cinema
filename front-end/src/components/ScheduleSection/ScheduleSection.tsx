import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ScheduleSection.scss";

interface Movie {
  title: string;
  year: number;
  length: number;
  poster: string;
  genre: string[];
  ageRestriction: number;
}

interface Hall {
  hallName: string;
}

interface Showtime {
  _id: string;
  movie: Movie;
  hall: Hall;
  time: string;
}

interface ScheduleSectionProps {
  date: Date | null;
  movieId?: string;
}

const ScheduleSection: React.FC<ScheduleSectionProps> = ({ date, movieId }) => {
  const [showtimes, setShowtimes] = useState<{ [key: string]: Showtime[] }>({});
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
    .toISOString()
    .split("T")[0];
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState<string>(today);

  useEffect(() => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 14);

    const formatDate = (date: Date) => date.toISOString().split("T")[0];

    const fetchShowtimes = async () => {
      try {
        const endpoint = movieId
          ? `/api/showtime?movieId=${movieId}&startDate=${formatDate(
              startDate
            )}&endDate=${formatDate(endDate)}`
          : `/api/showtime/date-range?startDate=${formatDate(
              startDate
            )}&endDate=${formatDate(endDate)}`;

        const response = await fetch(endpoint);
        const data = await response.json();
        setShowtimes(data);
      } catch (error) {
        console.error("Failed to fetch showtimes:", error);
      }
    };

    fetchShowtimes();
  }, [date, movieId]);

  useEffect(() => {
    if (date) {
      setSelectedDate(date.toISOString().split("T")[0]);
    }
  }, [date]);

  const calculateEndTime = (startTime: string, length: number) => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes);
    const endDate = new Date(startDate.getTime() + length * 60000);
    return endDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const getDayLabel = (date: Date, index: number) => {
    const options: Intl.DateTimeFormatOptions = { weekday: "long" };
    const fullDayName = date.toLocaleDateString("sv-SE", options);
    const shortDayName = fullDayName.slice(0, 3);

    if (index === 0) return { full: "Idag", short: "Ida" };
    if (index === 1) return { full: "Imorgon", short: "Imo" };
    return { full: fullDayName, short: shortDayName };
  };

  const dateRangeTwoWeeks = () => {
    const buttons = [];
    const today = new Date();

    for (let i = 0; i < 14; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      const currentDateKey = currentDate.toISOString().split("T")[0];
      const hasShowtimes =
        showtimes[currentDateKey] && showtimes[currentDateKey].length > 0;
      const dayLabel = getDayLabel(currentDate, i);

      buttons.push(
        <button
          key={i}
          className={`${selectedDate === currentDateKey ? "selected" : ""} ${
            !hasShowtimes ? "no-showtime" : ""
          }`}
          onClick={() => handleDateClick(currentDate)}
        >
          <p className="full-day-name">{dayLabel.full}</p>
          <p className="short-day-name">{dayLabel.short}</p>
          <p>
            {currentDate.toLocaleDateString("sv-SE", {
              day: "numeric",
              month: "numeric",
            })}
          </p>
        </button>
      );
    }

    return buttons;
  };

  const handleDateClick = (selectedDate: Date) => {
    setSelectedDate(selectedDate.toISOString().split("T")[0]);
  };

  const groupShowtimesByHall = (showtimes: Showtime[]) => {
    const grouped: { [hallName: string]: Showtime[] } = {};
    showtimes.forEach((showtime) => {
      if (!grouped[showtime.hall.hallName]) {
        grouped[showtime.hall.hallName] = [];
      }
      grouped[showtime.hall.hallName].push(showtime);
    });
    return grouped;
  };

  return (
    <section className="schedule-section col-12  p-0 p-md-2 g-0">
      {/* p-0: Sets padding to 0 on all screen sizes.
        p-md-2: Sets padding to 0.5rem (Bootstrap p-2) on medium screens and larger (≥768px). */}
      <div className="schedule-section-buttons g-0">{dateRangeTwoWeeks()}</div>

      <div className="schedule-section-title col-12 g-0">
        <h2>
          {
            getDayLabel(
              new Date(selectedDate),
              selectedDate === today ? 0 : selectedDate === tomorrow ? 1 : -1
            ).full
          }{" "}
          {new Date(selectedDate).toLocaleDateString("sv-SE", {
            day: "2-digit",
            month: "2-digit",
          })}
        </h2>
      </div>

      {selectedDate && showtimes[selectedDate] ? (
        <div className="schedule-columns row col-12">
          {Object.entries(groupShowtimesByHall(showtimes[selectedDate])).map(
            ([hallName, hallShowtimes]) => (
              <div
                key={hallName}
                className="schedule-column col-sm-12 col-md-12 col-lg-6"
              >
                <h3>{hallName}</h3>
                {hallShowtimes.map((showtime) => (
                  <div key={showtime._id} className="schedule-section-showtime">
                    <Link
                      to={`/booking/${showtime._id}`}
                      className="link-no-decoration"
                    >
                      <div className="schedule-section-showtime-info">
                        <div className="schedule-section-showtime-info__time">
                          <p>
                            {showtime.time} - <br />
                            {calculateEndTime(
                              showtime.time,
                              showtime.movie.length
                            )}
                          </p>
                        </div>
                        <div className="schedule-section-showtime-info__text">
                          <h5>
                            {showtime.movie.title} ({showtime.movie.year})
                          </h5>
                          <p> {showtime.movie.genre.join(", ")} </p>
                        </div>
                        <div className="schedule-section-showtime-info__text__age">
                          <p>Åldersgräns {showtime.movie.ageRestriction} år</p>
                        </div>
                        <div className="schedule-section-showtime-info__image">
                          <img
                            src={showtime.movie.poster}
                            alt={showtime.movie.title}
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      ) : (
        <p>Inga visningstillfällen tillgängliga för valt datum.</p>
      )}
    </section>
  );
};

export default ScheduleSection;
