import React, { useRef, useState } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import './App.css';
import Footer from './layout/Footer/Footer';
import Header from './layout/Header/Header';
import Main from './layout/Main/Main';

const App: React.FC = () => {
  const scheduleRef = useRef<HTMLElement | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

const lock = document.createElement('meta');
  lock.name = 'darkreader-lock';
  document.head.appendChild(lock);

  const handleSelectDate = (daysAhead: number) => {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + daysAhead);
    setSelectedDate(newDate);
    scheduleRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app container g-0 p-0">
      <div className="row w-100 g-0">
        <Router>
          <ConditionalHeader onSelectDate={handleSelectDate} />
          <div className="col-12 g-0">
            <Main scheduleRef={scheduleRef} selectedDate={selectedDate} />
          </div>
          <div className="col-12">
            <Footer />
          </div>
        </Router>
      </div>
    </div>
  );
};

const ConditionalHeader: React.FC<{ onSelectDate: (daysAhead: number) => void }> = ({ onSelectDate }) => {
  const location = useLocation();
  const isMovieInfoPage = location.pathname.includes('/movie-info/'); // Adjust this path if necessary

  return !isMovieInfoPage ? <Header onSelectDate={onSelectDate} /> : null;
};

export default App;
