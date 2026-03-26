import React from "react";
import Form_Group from "./Form_Group";
import { Link } from "react-router-dom";

const Form_Container = ({
  type = "login",
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  submitHandler,
  loading,
}) => {
  const isRegister = type === "register";

  return (
    <div className="form-container">
      <div className="content">
        <h2>{isRegister ? "Create Account" : "Welcome Back!"}</h2>
        <h3>{isRegister ? "Join us to find your rhythm." : "Where every mood finds its rhythm."}</h3>
      </div>
      <form onSubmit={submitHandler}>
        {isRegister && (
          <Form_Group
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
          />
        )}
        <Form_Group
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <Form_Group
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <button className="button" type="submit" disabled={loading}>
          {loading ? "Processing..." : isRegister ? "Register" : "Login"}
        </button>
      </form>
      <p>
        {isRegister ? "Already have an account? " : "Don't have an account? "}
        <Link to={isRegister ? "/login" : "/register"}>
          {isRegister ? "Login" : "Register"}
        </Link>
      </p>
    </div>
  );
};

export default Form_Container;
