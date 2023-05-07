import React, { useState, useContext } from "react";
import eye_close from "../img/eye-close.png";
import eye_open from "../img/eye-open.png";
import "../css/SignIn.css";
import { API } from "../api";
import logo from "../img/cientmelogo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginContext } from "../context/LoginContext";

export default function SignIn() {
  const { setUserLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  // const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const postData = () => {
    //checking email
    if (!email) {
      notifyA("Invalid email");
      return;
    }
    // Sending data to server
    fetch(`${API}/signin`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB("Signed In Successfully");
          console.log(data);
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          setUserLogin(true);
          navigate("/");
        }
        console.log(data);
      });
  };
  // show password

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="signIn">
      <div>
        <div className="loginForm">
          <img className="signUpLogo" src={logo} alt="" />
          <p>Sign up to experience cientme.</p>
          <br />
          <div>
            <br />
            <input
              type="email"
              name="email"
              id="email"
              required={true}
              value={email}
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="input_box">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              required={true}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <img
              src={showPassword ? eye_open : eye_close}
              onClick={togglePasswordVisibility}
              alt="Show password"
              className="eye_icon"
            />
          </div>
          <input
            type="submit"
            id="login-btn"
            onClick={() => {
              postData();
            }}
            value="Sign In"
          />
          <br /> <br />
          Don't have an account ?
          <Link to="/signup">
            <span style={{ color: "blue", cursor: "pointer" }}>Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
