import React, { use, useState } from "react";
import "../style/login.scss";
import Form_Group from "../components/Form_Group";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { loading, loginHandler } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();
    await loginHandler({ email, password });
    navigate("/");
  }

  if (loading) {
    return (
      <main className="login-page">
        <div className="form-container">
          <h2>Loading...</h2>
        </div>
      </main>
    );
  }

  return (
    <main className="login-page">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={submitHandler}>
          <Form_Group
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="Enter your email"
          />
          <Form_Group
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="Enter your password"
          />
          <button className="button" type="submit">
            Login
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
