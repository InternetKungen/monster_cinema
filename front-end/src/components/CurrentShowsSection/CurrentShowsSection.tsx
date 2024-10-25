import React, { useEffect, useState } from 'react';
import MovieComponent from '../MovieComponent/MovieComponent';
import './CurrentShowsSection.scss';

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
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Set today as a reference for date navigation
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to midnight

  // Fetch showtimes when `selectedDate` changes
  useEffect(() => {
    const fetchShowtimes = async () => {
      setLoading(true);
      setError(null);

      const formattedDate = selectedDate.toISOString().split('T')[0];
      try {
        const response = await fetch(`/api/showtime/date-range?startDate=${formattedDate}&endDate=${formattedDate}`);
        if (!response.ok) {
          throw new Error('Failed to fetch showtimes');
        }
        const data = await response.json();
        setShowtimes(data[formattedDate] || []);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShowtimes();
  }, [selectedDate]);

  // Filter unique movies by ID
  const uniqueMovies = Array.from(
    new Map(showtimes.map(showtime => [showtime.movie._id, showtime.movie])).values()
  );

  // Handlers for day navigation
  const handlePreviousDay = () => {
    setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)));
  };

  const handleNextDay = () => {
    setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)));
  };

  // Check if today or a week from today
  const isToday = selectedDate.toDateString() === today.toDateString();
  const isEndOfWeek = selectedDate.toDateString() === new Date(today.setDate(today.getDate() + 7)).toDateString();

  // Get label for the selected day
  const getDayLabel = (date: Date) => {
    const dayDiff = (date.getDay() - today.getDay()); // Difference in days

    if (dayDiff === 0) return 'Idag'; // Today
    if (dayDiff === 1) return 'Imorgon'; // Tomorrow

    return date.toLocaleDateString('sv-SE', { weekday: 'long' }); // Other days in Swedish
  };

  if (loading) return <div className="loading">Laddar filmer....</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <section>
      <section className="current-shows-section">
        <h2>På bio {getDayLabel(selectedDate)}</h2>

        {/* Day navigation buttons */}
        <section className="navigation-buttons">
          <button onClick={handlePreviousDay} disabled={isToday}>
            Föregående dag
          </button>
          <button onClick={handleNextDay} disabled={isEndOfWeek}>
            Nästa dag
          </button>
        </section>

        <section className="movie-grid">
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
            <p className="no-movies">Idag visar vi inga filmer, prova en annan dag</p>
          )}
        </section>
      </section>
    </section>
  );
};

export default CurrentShowsSection;
