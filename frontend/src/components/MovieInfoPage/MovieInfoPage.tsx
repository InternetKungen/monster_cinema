import React, { useState, useEffect } from "react";
import ScheduleSection from "../ScheduleSection/ScheduleSection";
import "./MovieInfoPage.scss";

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
  scheduleRef: React.RefObject<HTMLElement>;
  selectedDate: Date;
}

const formatRuntime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours > 1) {
    return `${hours} timmar ${remainingMinutes} minuter`;
  } else {
    return `${hours} timme ${remainingMinutes} minuter`;
  }
};

const MovieInfoPage: React.FC<MovieInfoPageProps> = ({
  movieId,
  scheduleRef,
  selectedDate,
}) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  useEffect(() => {
    if (movieId) {
      fetch(`/api/movie/${movieId}`)
        .then((response) => response.json())
        .then((data) => setMovie(data))
        .catch((error) => console.error("Error fetching movie:", error));
    }
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content">
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
            <p className="age-restriction col-lg-4">
              Åldersgräns: {movie.ageRestriction}+
            </p>
            <p className="genre col-lg-4">
              <span className="movie-info__label">Genre: </span>
              {movie.genre.join(", ")}
            </p>
            <p className="duration col-lg-4">
              <span className="movie-info__label">Speltid: </span>
              {formatRuntime(movie.length)}
            </p>
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

      <section ref={scheduleRef}>
        <ScheduleSection movieId={movieId} date={selectedDate} />
      </section>
    </div>
  );
};

export default MovieInfoPage;
