import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '../../assets/icons/search_35dp_FCAF00_FILL0_wght400_GRAD0_opsz40.png';
import LoginIcon from '../../assets/icons/person_35dp_FCAF00_FILL0_wght400_GRAD0_opsz40.png';

import './Header.scss';
import Logo from '../../assets/img/logo-text-side.png';
import LogoSmall from '../../assets/img/logo-no-text.png';

const Header: React.FC = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 576);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 576);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    // <div className="container">
    <header className="col-12 sticky-top margin-top-0">
      <div className="row col-12">
        <div className="schedule-button-container col-4 p-0">
          <Link to="/" className="schedule-button-container__button col-4">Idag</Link>
          <Link to="/" className="schedule-button-container__button col-4">Imorgon</Link>
          <Link to="/" className="schedule-button-container__button col-4">Senare</Link>
        </div>

          <div className="logo-container col-4">
            <div className="logo-img-wrapper">
          <Link to="/">
              <img src={isSmallScreen ? LogoSmall : Logo} className="logo-img" alt="Logo" />
              </Link>
            </div>
        </div>

        <div className="search-login-container col-4">
            <div className="search-login-container__icon col-6">
              <Link to="/">
                <img src={SearchIcon} alt="Search" className="SearchIcon" />
              </Link>
            </div>
            <div className="search-login-container__icon col-sm-6">
              <Link to="/">
                <img src={LoginIcon} alt="Login" className="LoginIcon" />
              </Link>
            </div>
          </div>
      </div>
      </header>
    // </div>
  );
};

export default Header;
