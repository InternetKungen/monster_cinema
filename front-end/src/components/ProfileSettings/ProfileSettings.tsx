import React, { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import Popup from "../../components/Popup/Popup";
import "./ProfileSettings.scss";

const ProfileSettings = () => {
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [alertPopup, setAlertPopup] = useState<string | null>(null);

  // Profile update state
  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");

  // Password update state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/user/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Misslyckades uppdatera användarinformation"
        );
      }

      setUser((prev) => (prev ? { ...prev, firstName, lastName } : null));
      setAlertPopup("Användarinformation har uppdaterats!");
    } catch (err) {
      setAlertPopup(err instanceof Error ? err.message : "Ett fel inträffade");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (newPassword !== confirmPassword) {
      setAlertPopup("Nya lösenordet matchar inte");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/user/update-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Misslyckades att uppdatera lösenord");
      }

      setAlertPopup("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setAlertPopup(err instanceof Error ? err.message : "Ett fel inträffade");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-settings">
      {alertPopup && (
        <div className="popup-overlay">
          <Popup
            title=""
            info={alertPopup}
            onClose={() => setAlertPopup(null)}
          />
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h2>Användarinformation</h2>
        </div>
        <div className="card-content">
          <form onSubmit={handleProfileUpdate}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="firstName">Förnamn:</label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Förnamn"
                  disabled={isLoading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Efternamn:</label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Efternamn"
                  disabled={isLoading}
                />
              </div>
            </div>
            <button type="submit" className="button" disabled={isLoading}>
              {isLoading ? "Uppdaterar..." : "Uppdatera information"}
            </button>
          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Ändra lösenord</h2>
        </div>
        <div className="card-content">
          <form onSubmit={handlePasswordUpdate}>
            <div className="form-group">
              <label htmlFor="oldPassword">Nuvarande lösenord</label>
              <input
                id="oldPassword"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Ange nuvarande lösenord"
                disabled={isLoading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">Nytt lösenord</label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Ange nytt lösenord"
                disabled={isLoading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Bekräfta nytt lösenord</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ange nytt lösenord igen"
                disabled={isLoading}
              />
            </div>
            <button type="submit" className="button" disabled={isLoading}>
              {isLoading ? "Uppdaterar..." : "Ändra lösenord"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
