import React, { useEffect, useState } from 'react';
import MovieComponent from '../MovieComponent/MovieComponent';
import Button from '../FrontPageButton/FrontPageButton';
import './MovieCollectionSection.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

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
  const [filterValue, setFilterValue] = useState<string | number |  null>(null);
  const [isMinThreshold, setIsMinThreshold] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/movie');
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
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
	console.log("Filter / Value: " + field + " : " + value)
    setFilterField(field);
    setFilterValue(value);
	console.log("Filter / Value: " + field + " : " + value)
  };

  const handleNumericFilter = (field: string | null, threshold: number | null, minThreshold: boolean = false) => {
    console.log("Numeric Filter / Field: " + field + " : " + threshold);
    setFilterField(field);
    setFilterValue(threshold);
    setIsMinThreshold(minThreshold);
  };

  const filteredMovies = filterField && filterValue
    ? movies.filter((movie) => {
        const fieldValue = movie[filterField as keyof Movie];

        if (typeof filterValue === "number" && typeof fieldValue === "number") {
          return isMinThreshold ? fieldValue >= filterValue : fieldValue < filterValue;
        }

         if (typeof filterValue === "string") {
        	return Array.isArray(fieldValue)
			? fieldValue.includes(filterValue)
			: fieldValue === filterValue;
      }
	   return false;
	})
    : movies;


	console.log("Filetered: " + JSON.stringify(filteredMovies))
  return (
    <div className="container py-5">
      <section className="movie-collection-section">


        <div className="sorting-button-container text-center mb-4">
          <Button className="btn btn-primary mx-2" text="Alla Filmer" onClick={() => handleFilter(null, null)} />
          <Button className="btn btn-secondary mx-2" text="Barn & Familj" onClick={() => handleNumericFilter('ageRestriction', 15)} />
          <Button className="btn btn-secondary mx-2" text="Senaste" onClick={() => handleFilter('year', '2024')} />
		  <Button className="btn btn-secondary mx-2" text="Populära" onClick={() => handleNumericFilter('imdbRating', 7.5, true)} />
          <Button className="btn btn-secondary mx-2" text="Klassiker" onClick={() => handleFilter('genre', 'Klassiker')} />
        </div>


        <div className="row">
          {filteredMovies.map((movie) => (
            <div key={movie._id} className="col-sm-6 col-md-4 col-lg-2 mb-4">
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
      </section>
    </div>
  );
};

export default MovieCollectionSection;
