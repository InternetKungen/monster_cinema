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

//Skapar state för att lagra dagens showtimes, loading-status och errormeddelanden
const CurrentShowsSection: React.FC = () => {
  const [todayShowtimes, setTodayShowtimes] = useState<Showtime[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  //Formaterar på dagens datum i YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  //Hämtar showtimes, endast för idag
  useEffect(() => {
    const fetchTodayShowtimes = async () => {
      try {
        const response = await fetch(`/api/showtime/date-range?startDate=${today}&endDate=${today}`);
        if (!response.ok) {
          throw new Error('Failed to fetch today’s showtimes');
        }
        const data = await response.json();
        setTodayShowtimes(data[today] || []);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodayShowtimes();
  }, [today]);

  // Filtrerar på unikt ID så samma film inte upprepas om den har flera showtimes
  const uniqueMovies = Array.from(
    new Map(todayShowtimes.map(showtime => [showtime.movie._id, showtime.movie])).values()
  );

  //Visar 'loading, error, eller idag visar vi inga filmer
  if (loading) return <div className="loading">Laddar...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (uniqueMovies.length === 0) return <p className="no-movies">Idag visar vi inga filmer</p>;

  return (
    <div>
      <section className="current-shows-section">
        <h2>Movies Playing Today</h2>
        <div className="movie-grid">
			{/* renderar varje unik film som en moviecomponent */}

          {uniqueMovies.map((movie) => (
            <MovieComponent
              key={movie._id}
              _id={movie._id}
              title={movie.title}
              year={movie.year}
              poster={movie.poster}
              genre={movie.genre}
              ageRestriction={movie.ageRestriction}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CurrentShowsSection;

