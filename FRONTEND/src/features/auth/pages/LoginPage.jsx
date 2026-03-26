import LeftLogin from "../components/LeftLogin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form_Container from "../components/Form_Container";
import MoodifyIcon from "../../shared/components/MoodifyIcon";
import { useAuth } from "../hooks/useAuth";
import "../style/auth.scss";

const LoginPage = () => {
  const { loading, loginHandler } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();
    await loginHandler({ email, password });
    navigate("/");
  }

  //   if (loading) {
  //     return (
  //       <main className="login-page">
  //         <div className="form-container">
  //           <h2>Loading...</h2>
  //         </div>
  //       </main>
  //     );
  //   }
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
            type="login"
            submitHandler={submitHandler}
            // username={username}
            // setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            // loading={loading}
            navigate={navigate}
            message={"Already have an account ?"}
            Link={"register"}
            buttonType={"Login"}
          />
          {/* <div className="bottom"></div> */}
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
