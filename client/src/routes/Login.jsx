import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import useSignIn from "react-auth-kit/hooks/useSignIn";
// components
import Navbar from "../components/Navbar";

function Login() {
  // variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const url = process.env.REACT_APP_URL || "http://localhost:5000";
  const navigate = useNavigate();
  const signIn = useSignIn();

  // helper funtions
  async function handleSubmit(ev) {
    ev.preventDefault();
    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post(`${url}/login`, data);
      if (response.data.message === "success") {
        setError("");
        const decodedToken = jwtDecode(response.data.token);

        signIn({
          auth: {
            token: response.data.token,
            type: "Bearer",
          },
          userState: {
            uid: decodedToken.id,
            name: decodedToken.username,
          },
        });

        navigate("/");
      } else {
        setError("Invalid username or password.");
      }
    } catch (err) {
      console.log("Error on submit: ", err);
    }
  }

  return (
    <div className="authPage">
      <Navbar />

      <div className="container text-light d-flex align-items-center justify-content-center flex-column authCon">
        <h1 className="display-3">Login</h1>

        <form className="p-5 rounded-2 mt-5" onSubmit={(ev) => handleSubmit(ev)}>
          {error && <p className="mb-4 text-danger">{error}</p>}

          <div className="inputBox">
            <input
              type="text"
              name="username"
              id="username"
              required
              autoComplete="off"
              autoFocus
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
            />
            <label htmlFor="username">Username</label>
          </div>

          <div className="inputBox">
            <input
              type="password"
              name="password"
              id="password"
              required
              autoComplete="off"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <label htmlFor="password">Password</label>
          </div>

          <button className="btn btn-outline-success btn-lg px-5 mt-3" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
