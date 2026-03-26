import React from "react";
import loginImage from "../../../assets/images/loginPage.png?url";

const LeftLogin = () => {
  return (
    <div className="left">
      <img src={loginImage} alt="Login" />
      <div className="overlay-content">
        <h2>Feel the Music</h2>
        <p>Let your mood choose your vibe 🎧</p>
      </div>
    </div>
  );
};

export default LeftLogin;
