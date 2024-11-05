import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import LoginIcon from "../../assets/icons/person_35dp_FCAF00_FILL0_wght400_GRAD0_opsz40.png";
import ProfileIcon from "../../assets/icons/clarify_35dp_FCAF00_FILL0_wght400_GRAD0_opsz40.png";
import { UserContext } from "../../UserContext";
import "./Header.scss";
import Logo from "../../assets/img/logo-text-side.png";
import LoginModal from "../../views/modals/LoginModal";
import LogoutIcon from "../../assets/icons/logout_35dp_FCAF00_FILL0_wght400_GRAD0_opsz40.png";

const Header: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("login");
  const handleShow = () => {
    setModalType("login");
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);
  const { user } = useContext(UserContext);
  if (!user) {
    console.log("No user");
  }
  return (
    <header
      className="header position-fixed"
      style={{ width: "80%", margin: "0 auto" }}
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
            {user && (
              <div className="icon">
                <Link to="/profile">
                  <img src={ProfileIcon} alt="Profile" className="SearchIcon" />
                </Link>
              </div>
            )}
            <div className="icon">
              {user ? (
                <Link to="/">
                  <img src={LogoutIcon} alt="Login" className="LoginIcon" />
                </Link>
              ) : (
                <button onClick={handleShow}>
                  <img src={LoginIcon} alt="Login" className="LoginIcon" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <LoginModal
        show={showModal}
        setModalType={setModalType}
        type={modalType}
        handleClose={handleClose}
      />
    </header>
  );
};

export default Header;
