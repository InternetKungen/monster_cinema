import React from 'react';
import './Home.css';
import CurrentShowsSection from '../../../components/CurrentShowsSection/CurrentShowsSection';
import MovieCollectionSection  from '../../..//components/MovieCollectionSection/MovieCollectionSection';
import ScheduleSection from '../../../components/ScheduleSection/ScheduleSection';

const Home: React.FC = () => {
  return (
    <div>
				<section>
					<CurrentShowsSection />
				</section>
				<section>
					<MovieCollectionSection />
			</section>
			<section>
				<ScheduleSection date={new Date()} />
				</section>
    </div>
  );
};

export default Home;