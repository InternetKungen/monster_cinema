import React, { useState, useEffect, useRef } from 'react';
import ScheduleSection from '../ScheduleSection/ScheduleSection';
import Header from '../../layout/Header/Header';
import './MovieInfoPage.scss';

interface Movie {
  _id: string;
  title: string;
  year: number;
  length: number;
  description: string;
  genre: string[];
  distributor: string;
  productionCountries: string[];
  language: string;
  subtitles: string;
  director: string;
  actors: string[];
  poster: string;
  trailer: string;
  ageRestriction: number;
  imdbRating: number;
}

interface MovieInfoPageProps {
  movieId: string | undefined;
}

const MovieInfoPage: React.FC<MovieInfoPageProps> = ({ movieId }) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date()); // State to manage the selected date
  const scheduleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (movieId) {
      fetch(`/api/movie/${movieId}`)
        .then((response) => response.json())
        .then((data) => setMovie(data))
        .catch((error) => console.error("Error fetching movie:", error));
    }
  }, [movieId]);

  const scrollToSchedule = (daysOffset: number) => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + daysOffset); // Adjust the date based on button clicked
    setSelectedDate(targetDate); // Update the selected date state
    if (scheduleRef.current) {
      scheduleRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content">
      <Header onSelectDate={scrollToSchedule} />

      <div className="trailer-container col-12">
        <div className="youtube">
          <iframe
            src={"https://www.youtube.com/embed/" + movie.trailer}
            title={movie.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="movie-info-container d-flex justify-content-between p-2 align-items-center">
        <div className="movie-info">
          <h2>{movie.title}</h2>
          <div className="row col-lg-12 align-items-center">
            <p className="age-restriction col-lg-4">Åldersgräns: {movie.ageRestriction}+</p>
            <p className="genre col-lg-4">Genre: {movie.genre.join(", ")}</p>
            <p className="duration col-lg-4">Längd: {movie.length} min</p>
          </div>
          <p className="description">{movie.description}</p>
          <div className="wrapper-movie-info__details">
            <div className="movie-info__details">
              <p>Regissör: {movie.director}</p>
              <p>Skådespelare: {movie.actors.join(", ")}</p>
              <p>Originaltitel: {movie.title}</p>
              <p>Språk: {movie.language}</p>
              <p>År: {movie.year}</p>
              <p>Produktionsländer: {movie.productionCountries.join(", ")}</p>
              <p>Distributör: {movie.distributor}</p>
            </div>
          </div>
        </div>

        <div className="movie-poster">
          <img src={movie.poster} alt={movie.title} width={300} />
        </div>
      </div>
	  <div>
	        <ScheduleSection movieId={movieId} date={new Date()} />
    </div>

      <div ref={scheduleRef}>
        <ScheduleSection movieId={movieId} date={selectedDate} />
      </div>
    </div>
  );
};

export default MovieInfoPage;