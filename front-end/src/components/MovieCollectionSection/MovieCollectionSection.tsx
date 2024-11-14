import React, { useEffect, useState } from "react";
import MovieComponent from "../MovieComponent/MovieComponent";
import Button from "../FrontPageButton/FrontPageButton";
import TitleBarComponent from "../TitleBarComponent/TitleBarComponent";
import "./MovieCollectionSection.scss";
import "bootstrap/dist/css/bootstrap.min.css";

interface Movie {
  _id: string;
  title: string;
  genre: string[];
  year: number;
  poster: string;
  ageRestriction: number;
  imdbRating: number;
}

const MovieCollectionSection: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterField, setFilterField] = useState<string | null>(null);
  const [filterValue, setFilterValue] = useState<string | number | null>(null);
  const [isMinThreshold, setIsMinThreshold] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("/api/movie");
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        setMovies(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleFilter = (field: string | null, value: string | null) => {
    console.log("Filter / Value: " + field + " : " + value);
    setFilterField(field);
    setFilterValue(value);
    console.log("Filter / Value: " + field + " : " + value);
  };

  const handleNumericFilter = (
    field: string | null,
    threshold: number | null,
    minThreshold: boolean = false
  ) => {
    console.log("Numeric Filter / Field: " + field + " : " + threshold);
    setFilterField(field);
    setFilterValue(threshold);
    setIsMinThreshold(minThreshold);
  };

  const itemsPerRow = 3;
  const initialMoviesToShow = 5;
  const filteredMovies =
    filterField && filterValue
      ? movies.filter((movie) => {
          const fieldValue = movie[filterField as keyof Movie];

          if (
            typeof filterValue === "number" &&
            typeof fieldValue === "number"
          ) {
            return isMinThreshold
              ? fieldValue >= filterValue
              : fieldValue < filterValue;
          }

          if (typeof filterValue === "string") {
            return Array.isArray(fieldValue)
              ? fieldValue.includes(filterValue)
              : fieldValue === filterValue;
          }
          return false;
        })
      : movies;

  const displayedMovies = showMore
    ? filteredMovies
    : filteredMovies.slice(
        0,
        Math.ceil(initialMoviesToShow / itemsPerRow) * itemsPerRow
      );

  console.log("Filetered: " + JSON.stringify(filteredMovies));
  return (
    <div className="container col-12 py-5">
      <section className="movie-collection-section col-12 g-0">
        <TitleBarComponent className="titlebar-component" title="Våra filmer" />
        <div className="sorting-button-container text-center col-md-12 col-lg-6 g-0">
          <Button
            className="filter-button"
            text="Alla Filmer"
            onClick={() => handleFilter(null, null)}
          />
          <Button
            className="filter-button"
            text="Barn & Familj"
            onClick={() => handleNumericFilter("ageRestriction", 15)}
          />
          <Button
            className="filter-button"
            text="Senaste"
            onClick={() => handleFilter("year", "2024")}
          />
          <Button
            className="filter-button"
            text="Populära"
            onClick={() => handleNumericFilter("imdbRating", 7.5, true)}
          />
          <Button
            className="filter-button"
            text="Klassiker"
            onClick={() => handleNumericFilter("year", 1995)}
          />
        </div>

        <div className="movie-grid-container">
          <div className="movie-grid col-12">
            {displayedMovies.map((movie) => (
              <div key={movie._id} className="movie-item">
                <MovieComponent
                  _id={movie._id}
                  title={movie.title}
                  year={movie.year}
                  poster={movie.poster}
                  genre={movie.genre}
                  ageRestriction={movie.ageRestriction}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-3">
          <Button
            className="hidden-button"
            text={showMore ? "Visa färre filmer" : "Visa fler filmer"}
            onClick={() => setShowMore(!showMore)}
          />
        </div>
        {/* </div> */}
      </section>
    </div>
  );
};

export default MovieCollectionSection;
