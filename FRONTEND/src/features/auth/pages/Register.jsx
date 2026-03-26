import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form_Group from "../components/Form_Group";
import "../style/register.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const { registerHandler, loading } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerHandler({ username, email, password });
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  if (loading) {
    return (
      <main className="register-page">
        <div className="form-container">
          <h2>Loading...</h2>
        </div>
      </main>
    );
  }

  return (
    <main className="register-page">
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <Form_Group
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form_Group
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form_Group
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <button className="button" type="submit">
            Register
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
