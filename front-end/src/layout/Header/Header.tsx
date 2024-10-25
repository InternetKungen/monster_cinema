import React from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '../../assets/icons/search_35dp_FCAF00_FILL0_wght400_GRAD0_opsz40.png';
import LoginIcon from '../../assets/icons/person_35dp_FCAF00_FILL0_wght400_GRAD0_opsz40.png';

import './Header.scss';
import Logo from '../../assets/img/logo-text-side.png';

const Header: React.FC = () => {
  return (
    <header
      className="header position-fixed"
      style={{ width: '80%', margin: '0 auto' }}
    >
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col d-flex justify-content-start">
            <Link to="/" className="nav-link">
              Idag
            </Link>
            <Link to="/" className="nav-link">
              Imorgon
            </Link>
            <Link to="/" className="nav-link">
              Senare
            </Link>
          </div>

          <div className="col text-center">
            <Link to="/">
              <img src={Logo} className="logo-img" alt="Logo" />
            </Link>
          </div>

          <div className="col d-flex justify-content-end">
            <Link to="/">
              <img src={SearchIcon} alt="Search" className="icon" />
            </Link>
            <Link to="/">
              <img src={LoginIcon} alt="Login" className="icon" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
