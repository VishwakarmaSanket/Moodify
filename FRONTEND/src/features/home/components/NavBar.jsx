import React from "react";
import MoodifyIcon from "../../shared/components/MoodifyIcon";
import Profile from "../components/Profile";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="left-nav">
        <MoodifyIcon />
        <h1>Moodify</h1>
      </div>
      <div className="mid-nav">
        {/* <div className="search">
          <input type="text" placeholder="Search" />
        </div> */}
      </div>
      <div className="right-nav">
        <Profile />
      </div>
    </div>
  );
};

export default NavBar;
