import React, { useRef, useState } from 'react';
import './Home.css';
import CurrentShowsSection from '../../../components/CurrentShowsSection/CurrentShowsSection';
import MovieCollectionSection  from '../../..//components/MovieCollectionSection/MovieCollectionSection';
import ScheduleSection from '../../../components/ScheduleSection/ScheduleSection';

interface HomeProps {
  scheduleRef: React.RefObject<HTMLElement>;
  selectedDate: Date;
}

const Home: React.FC<HomeProps> = ({ scheduleRef, selectedDate }) => {
  return (
		<div>
			<section>
				<CurrentShowsSection />
			</section>
			<section>
				<MovieCollectionSection />
			</section>
			<section ref={scheduleRef}>
				<ScheduleSection date={selectedDate} />
			</section>
    </div>
  );
};

export default Home;