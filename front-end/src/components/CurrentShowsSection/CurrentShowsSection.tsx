import React, { useEffect, useState } from "react";
import MovieComponent from "../MovieComponent/MovieComponent";
import "./CurrentShowsSection.scss";
import leftArrowImg from "../../assets/img/left-arrow-down.png";
import rightArrowImg from "../../assets/img/right-arrow-down.png";
import bigRightArrowImg from "../../assets/img/big-arrow-right.png";
import bigLeftArrowImg from "../../assets/img/big-arrow-left.png";

interface Movie {
  _id: string;
  title: string;
  genre: string[];
  year: number;
  poster: string;
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

const CurrentShowsSection: React.FC = () => {
  // const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [allShowtimes, setAllShowtimes] = useState<{
    [date: string]: Showtime[];
  }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Ställ in idag som referens för datumnavigation
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to midnight

  useEffect(() => {
    const fetchWeeklyShowtimes = async () => {
      setLoading(true);
      setError(null);

      const startDate = today.toISOString().split("T")[0];
      const endDate = new Date(today); // Skapar kopia av today
      endDate.setDate(today.getDate() + 7);
      const formattedEndDate = endDate.toISOString().split("T")[0];

      try {
        const response = await fetch(
          `/api/showtime/date-range?startDate=${startDate}&endDate=${formattedEndDate}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch showtimes");
        }
        const data = await response.json();
        console.log(data); // Kontrollera om data ser ut som förväntat
        setAllShowtimes(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyShowtimes();
  }, []);

  const formattedSelectedDate = selectedDate.toISOString().split("T")[0];
  const showtimes = allShowtimes[formattedSelectedDate] || []; // Hämta showtimes för det valda datumet

  // Kontrollera om det är idag eller en vecka framåt
  const isToday = selectedDate.toDateString() === new Date().toDateString();
  const endOfWeek = new Date(today); // Kopia av today för slutdatum
  endOfWeek.setDate(today.getDate() + 6);
  const isEndOfWeek = selectedDate.toDateString() === endOfWeek.toDateString();

  // Filtrera unika filmer på ID
  const uniqueMovies = Array.from(
    new Map(
      showtimes.map((showtime) => [showtime.movie._id, showtime.movie])
    ).values()
  );

  // Hanterar dagsnavigationen
  const handlePreviousDay = () => {
    setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)));
  };

  const handleNextDay = () => {
    setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)));
  };

  // Hämtar label för utvald dag
  const getDayLabel = (date: Date) => {
    const dayDiff = date.getDay() - today.getDay(); // Skillnad i dagar

    if (dayDiff === 0) return "idag";
    if (dayDiff === 1) return "imorgon";

    return date.toLocaleDateString("sv-SE", { weekday: "long" }); // Veckodagar
  };

  if (loading) return <div className="loading">Laddar filmer....</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const cardWidth = 200; // Exempelbredd på varje MovieComponent-kort
  const handleScroll = (distance: number) => {
    const scrollContainer = document.querySelector(
      ".current-scroll"
    ) as HTMLElement;

    if (scrollContainer) {
      const distanceToScroll = distance * cardWidth;
      scrollContainer.scrollBy({
        left: distanceToScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="container pb-0 g-0 px-md-3">
      <section className="current-shows-section col-12 g-0 p-0">
        <section className="titlebar-container">
          {/* Dagsnavigationsknappar */}
          <section className="navigation-buttons">
            <button
              className="arrow-button previous"
              onClick={handlePreviousDay}
              disabled={isToday}
              onContextMenu={(e) => e.preventDefault()}
            >
              {/* &#8592; Vänster pil */}
              <img src={leftArrowImg} alt="left arrow for navigation" />
            </button>
            <h2 className="titlebar-text">
              På bio {getDayLabel(selectedDate)}
            </h2>
            <button
              className="arrow-button next"
              onClick={handleNextDay}
              disabled={isEndOfWeek}
              onContextMenu={(e) => e.preventDefault()}
            >
              <img src={rightArrowImg} alt="right arrow for navigation" />
              {/* &#8594; Höger pil */}
            </button>
          </section>
        </section>
        <section className="current-movie-grid-wrapper">
          <button
            className="scroll-button left"
            onClick={() => handleScroll(-3)}
            onContextMenu={(e) => e.preventDefault()}
          >
            <img src={bigLeftArrowImg} alt="Scroll left" />
          </button>
          <section className="current-movie-grid col-12 current-scroll">
            {uniqueMovies.length > 0 ? (
              uniqueMovies.map((movie) => (
                <MovieComponent
                  key={movie._id}
                  _id={movie._id}
                  title={movie.title}
                  year={movie.year}
                  poster={movie.poster}
                  genre={movie.genre}
                  ageRestriction={movie.ageRestriction}
                />
              ))
            ) : (
              <div className="no-movies">
                <p>Idag visar vi inga filmer, prova en annan dag</p>
              </div>
            )}
          </section>
          <button
            className="scroll-button right"
            onClick={() => handleScroll(3)}
            onContextMenu={(e) => e.preventDefault()}
          >
            <img src={bigRightArrowImg} alt="Scroll right" />
          </button>
        </section>
      </section>
    </section>
  );
};

export default CurrentShowsSection;
