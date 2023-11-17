import React, { useState } from "react";
import "./SignUp.css";
import supabase from "../client";
import CryptoJS from "crypto-js";
import { Link } from "react-router-dom";

import { validateSession } from "../client";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === "" || password === "") {
      alert("Please fill out all fields");
      return;
    }
    const getUser = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("username", username);
      if (error) {
        console.log(error);
        return;
      }
      const hashedPassword = CryptoJS.SHA256(password).toString();
      if (data[0].password !== hashedPassword) {
        alert("Incorrect password");
        return;
      }
      localStorage.setItem("currentUser", JSON.stringify(data[0]));
      window.location.href = "/profile";
    };
    getUser();
  };

  return (
    <div className="sign-up">
      <h1>Log in to Devmons!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <button type="submit">Log In</button>
      </form>
      <button>
        <Link to="/signup">Create a new account</Link>
      </button>
    </div>
  );
}

export default LoginPage;
