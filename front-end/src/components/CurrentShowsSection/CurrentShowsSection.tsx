import React, { useEffect, useState } from 'react';
import MovieComponent from '../MovieComponent/MovieComponent';
import './CurrentShowsSection.scss';

interface Movie {
  _id: string;
  title: string;
  genre: string[];
//   year: number;
  poster: string;
//   ageRestriction: number;
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

  // Ställ in idag som referens för datumnavigation
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to midnight

  // Fetch showtimes när `selectedDate` ändras
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

  // Filtrera unika filmer på ID
  const uniqueMovies = Array.from(
    new Map(showtimes.map(showtime => [showtime.movie._id, showtime.movie])).values()
  );

  // Hanterar dagsnavigationen
  const handlePreviousDay = () => {
    setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)));
  };

  const handleNextDay = () => {
    setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)));
  };

  // Kollar om idag eller en vecka från idag
  const isToday = selectedDate.toDateString() === today.toDateString();
  const isEndOfWeek = selectedDate.toDateString() === new Date(today.setDate(today.getDate() + 7)).toDateString();

  // Hämtar label för utvald dag
  const getDayLabel = (date: Date) => {
    const dayDiff = (date.getDay() - today.getDay()); // Skillnad i dagar

    if (dayDiff === 0) return 'idag';
    if (dayDiff === 1) return 'imorgon';

    return date.toLocaleDateString('sv-SE', { weekday: 'long' }); // Veckodagar
  };

  if (loading) return <div className="loading">Laddar filmer....</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <section>
      <section className="current-shows-section">
		<section className='titlebar-container'>
        {/* Dagsnavigationsknappar */}
		<section className="navigation-buttons">
  		<button className="arrow-button previous" onClick={handlePreviousDay} disabled={isToday}>
    		&#8592; {/* Vänster pil*/}
  			</button>
  		<h2>På bio {getDayLabel(selectedDate)}</h2>
  			<button className="arrow-button next" onClick={handleNextDay} disabled={isEndOfWeek}>
    		&#8594; {/* Höger pil */}
  			</button>
		</section>
		</section>
        <section className="movie-grid">
          {uniqueMovies.length > 0 ? (
            uniqueMovies.map((movie) => (
              <MovieComponent
                key={movie._id}
                _id={movie._id}
                title={movie.title}
                // year={movie.year}
                poster={movie.poster}
                genre={movie.genre}
                // ageRestriction={movie.ageRestriction}
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
