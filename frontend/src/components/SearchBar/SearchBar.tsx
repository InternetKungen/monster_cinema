import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './SearchBar.scss';

interface Movie {
  _id: string;
  title: string;
  genre: string[];
  director: string;
  actors: string[];
  poster: string;
  year: number;
}

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/movie');
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = movies.filter(movie => {
        const searchLower = searchTerm.toLowerCase();
        return (
          movie.title.toLowerCase().includes(searchLower) ||
          movie.genre.some(g => g.toLowerCase().includes(searchLower)) ||
          movie.director.toLowerCase().includes(searchLower) ||
          movie.actors.some(actor => actor.toLowerCase().includes(searchLower))
        );
      });
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies([]);
    }
  }, [searchTerm, movies]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="search-bar-container">
      <div ref={searchContainerRef} className="search-bar">
        <input
          ref={searchInputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Sök filmer..."
          className="search-bar__input"
        />
        
        {filteredMovies.length > 0 && (
          <div className="search-bar__results">
            {filteredMovies.map(movie => (
              <Link 
                key={movie._id} 
                to={`/movie-info/${movie._id}`}
                className="search-bar__result__movie"
                onClick={() => {
                  setSearchTerm('');
                  onClose();
                }}
              >
                <img 
                  src={movie.poster} 
                  alt={movie.title} 
                  className="search-bar__result__movie__poster"
                />
                <div>
                  <h3 className="search-bar__result__movie__title">{movie.title}</h3>
                  <p className="search-bar__result__movie__info">
                    {movie.year} • {movie.genre.join(', ')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;