import React, { useEffect, useContext } from "react";
import "./LoginModal.scss"; // Ensure this import is correct
import { UserContext } from "../../UserContext";


type Props = {
  type: string;
  show: boolean;
  handleClose: () => void;
  setModalType: (type: string) => void;
};

const LoginModal: React.FC<Props> = ({
  type,
  show,
  handleClose,
  setModalType,
}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
    const { setUser } = useContext(UserContext);
  useEffect(() => {
    if (show) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [show]);

  if (!show) {
    return null;
  }

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          alert("User created successfully");
          setUser(data.user);
          handleClose();
        } else {
          alert(data.error);
        }
      });
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50"
      style={{ zIndex: 1000 }}
    >
      {type === "login" ? (
        <section
          className="modal-content"
          style={{
            background:
              "linear-gradient(to right, rgba(0,15,38,100), rgba(4,86,133,100), rgba(0,15,38,100))",
            borderRadius: "10px",
            padding: "20px",
            width: "600px",
            color: "#FCAF00",
            maxWidth: "90%",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
            position: "relative",
          }}
        >
          <span className="close-button" onClick={handleClose}>
            &times;
          </span>
          <h2>Logga in</h2>
          <form>
            <div className="form-group">
              <label htmlFor="email">E-post</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
            </div>
            <button type="submit" className="submit-button">
              Logga in
            </button>
            <div className="my-3">
              <p>
                Har du glömt lösenordet? Klicka <span>här</span>
              </p>
            </div>
            <button
              onClick={() => setModalType("register")}
              type="button"
              className="submit-button"
            >
              Skapa användare
            </button>
          </form>
        </section>
      ) : (
        <div
          className="modal-content"
          style={{
            background:
              "linear-gradient(to right, rgba(0,15,38,100), rgba(4,86,133,100), rgba(0,15,38,100))",
            borderRadius: "10px",
            padding: "20px",
            width: "600px",
            color: "#FCAF00",
            maxWidth: "90%",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
            position: "relative",
          }}
        >
          <span className="close-button" onClick={handleClose}>
            &times;
          </span>
          <h2>Skapa användare</h2>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="email">E-post</label>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name="email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Lösenord</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name="password"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="firstname">Förnamn</label>
              <input type="text" id="firstname" onChange={(e)=>setFirstName(e.target.value)} value={firstName} name="firstname" required />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Efternamn</label>
              <input type="text" onChange={(e)=>setLastName(e.target.value)} value={lastName} id="lastname" name="lastname" required />
            </div>
            <button type="submit" className="submit-button">
              Skapa användare
            </button>
            <div className="my-3">
              <p>
                Har du redan ett konto? Klicka <span>här</span>
              </p>
            </div>
            <button
              onClick={() => setModalType("login")}
              type="button"
              className="submit-button"
            >
              Logga in
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginModal;
