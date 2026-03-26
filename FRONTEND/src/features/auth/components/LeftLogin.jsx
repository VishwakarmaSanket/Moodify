import React from "react";
import loginImage from "../../../assets/images/loginPage.png";

const LeftLogin = () => {
  return (
    <div className="left">
      <img src={loginImage} alt="" />
      <div className="overlay-content">
        <h2>Feel the Music</h2>
        <p>Let your mood choose your vibe 🎧</p>
      </div>
    </div>
  );
};

export default LeftLogin;
