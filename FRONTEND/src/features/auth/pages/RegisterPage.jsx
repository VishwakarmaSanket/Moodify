import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/auth.scss";
import LeftLogin from "../components/LeftLogin";
import Form_Container from "../components/Form_Container";
import MoodifyIcon from "../../shared/components/MoodifyIcon";
import { useAuth } from "../hooks/useAuth";

const RegisterPage = () => {
  const { registerHandler, loading } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await registerHandler({ username, email, password });
      navigate("/");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <main className="auth-page-container">
      <div className="container">
        <LeftLogin />
        <div className="right">
          <div className="brand">
            <MoodifyIcon />
            Moodify
          </div>
          <Form_Container
            type="register"
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            submitHandler={submitHandler}
            loading={loading}
          />
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
