import React from 'react';
import { Link } from 'react-router-dom';
import './MovieComponent.scss';

interface MovieButtonProps {
	_id: string;
	title: string;
	year: number;
	poster: string;
	genre: string[];
	ageRestriction: number;
}

const MovieComponent: React.FC<MovieButtonProps> = ({ _id, title, year, poster, genre, ageRestriction }) => {
	return (
		<Link to={`/movie-info/${_id}`} className="movie-button-container">
			<article className="movie-button">
				<div className="movie-button__poster">
					<img src={poster} alt={title} />
				</div>
				<h2>{title}</h2>
				<p className="year">{year}</p>
				<p className="genre">{genre.join(', ')}</p>
				<p className="age-restriction">Åldersgräns {ageRestriction} år</p>
			</article>
		</Link>
	);
};

export default MovieComponent;
