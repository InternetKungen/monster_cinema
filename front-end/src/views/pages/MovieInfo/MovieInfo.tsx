
import React from 'react';
import { useParams } from 'react-router-dom';
import MovieInfoPage from '../../../components/MovieInfoPage/MovieInfoPage';

interface MovieInfoProps {
  scheduleRef: React.RefObject<HTMLElement>;
  selectedDate: Date;
}

const MovieInfo: React.FC<MovieInfoProps> = ({ scheduleRef, selectedDate }) => {
  const { id } = useParams();

  return (
    <div className="movie-info-page">
      <MovieInfoPage movieId={id} scheduleRef={scheduleRef} selectedDate={selectedDate} />

    </div>
  );
};

export default MovieInfo;