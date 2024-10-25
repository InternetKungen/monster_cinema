import React, { useState, useEffect } from 'react';
import "./MovieInfoPage.css";
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

  useEffect(() => {
    if (movieId) {
      // Här gör du en API-förfrågan för att hämta filmen baserat på movieId
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
      <div className="trailer-container">
        <div className="youtube">
          <iframe
            width="100%"
            height="600"
            src={"https://www.youtube.com/embed/" + movie.trailer}
            title={movie.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ marginInline: "auto" }}
          ></iframe>
        </div>
      </div>

      <div className="movie-info-container my-4 d-flex justify-content-between p-2  align-items-center">
        <div className="movie-info">
          <h2>{movie.title}</h2>
          <div className="d-flex gap-4">
          <p className="age-restriction">
            Åldersgräns: {movie.ageRestriction}+
          </p>
          <p className="genre">Genre: {movie.genre.join(", ")}</p>
          <p className="duration">Längd: {movie.length} min</p>

          </div>
          <p className="description">{movie.description}</p>

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

        <div className="movie-poster">
          <img src={movie.poster} alt={movie.title} width={300} />
        </div>
      </div>

      {/* Lägg till ScheduleSection här */}
    </div>
  );
};

export default MovieInfoPage;
