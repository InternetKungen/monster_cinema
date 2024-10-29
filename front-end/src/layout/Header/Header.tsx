import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '../../assets/icons/search_35dp_FCAF00_FILL0_wght400_GRAD0_opsz40.png';
import LoginIcon from '../../assets/icons/person_35dp_FCAF00_FILL0_wght400_GRAD0_opsz40.png';
import ProfileIcon from "../../assets/icons/clarify_35dp_FCAF00_FILL0_wght400_GRAD0_opsz40.png"
import { UserContext } from '../../UserContext';
import './Header.scss';
import Logo from '../../assets/img/logo-text-side.png';
import LogoSmall from '../../assets/img/logo-no-text.png';
import LoginModal from '../../views/modals/LoginModal';

const Header: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('login');
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const { user } = useContext(UserContext);
  console.log(user);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 576);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 576);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <header className="container-fluid sticky-top p-0">
      <div className="row w-100">
        <div className="schedule-button-container col-4">
          <Link to="/" className="schedule-button-container__button col-4">Idag</Link>
          <Link to="/" className="schedule-button-container__button col-4">Imorgon</Link>
          <Link to="/" className="schedule-button-container__button col-4">Senare</Link>
        </div>

        <div className="logo-container col-4 text-center">
          <div className="logo-img-wrapper col-12">
            <Link to="/">
            <img src={isSmallScreen ? LogoSmall : Logo} className="logo-img" alt="Logo" />
            </Link>
          </div>
        </div>

        <div className="search-login-container col-4 p-0">
            <div className="search-login-container__icon col-6">
              <Link to="/">
                <img src={SearchIcon} alt="Search" className="SearchIcon" />
              </Link>
            </div>
            <div className="search-login-container__icon col-6">
              {user ? (
                <Link to="/profile">
                  <img src={ProfileIcon} alt="Login" className="LoginIcon" />
                </Link>
              ) : (
                <div onClick={handleShow}>
                <img src={LoginIcon} alt="Login" className="LoginIcon" />
              </div>
              )}
              
            </div>
          </div>
      </div>
      <LoginModal show={showModal} setModalType={setModalType} type={modalType} handleClose={handleClose} />
    </header>
  );
};

export default Header;
