import React, { useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../styles/profile.scss";
import { ChevronDown, ChevronUp, LogOut } from "lucide-react";

const Profile = () => {
  const { user, logoutHandler } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Get user initials from username or email
  const getInitials = () => {
    if (user?.username) {
      return user.username
        .split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase();
    }
    return "U";
  };

  const handleLogout = async () => {
    await logoutHandler();
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <div className="avatar" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <h2>{getInitials()}</h2>
        </div>
        <div
          className=" username"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <h1>{user?.username || "Guest"}</h1>
          {dropdownOpen ? (
            <ChevronUp color="#444" />
          ) : (
            <ChevronDown color="#444" />
          )}
        </div>

        {dropdownOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item user-info">
              <p className="email">{user?.email}</p>
            </div>
            <button className="dropdown-item logout-btn" onClick={handleLogout}>
              <h1>Logout</h1>
              <LogOut color="#d32f2f" size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
