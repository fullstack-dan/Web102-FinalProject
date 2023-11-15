import React, { useState } from "react";
import CryptoJS from "crypto-js";
import supabase from "../client";
import "./SignUp.css";

import char_one_head from "../assets/char_one_head.png";
import char_two_head from "../assets/char_two_head.png";
import char_three_head from "../assets/char_three_head.png";
import char_four_head from "../assets/char_four_head.png";
import char_five_head from "../assets/char_five_head.png";
import char_six_head from "../assets/char_six_head.png";
import char_seven_head from "../assets/char_seven_head.png";
import char_eight_head from "../assets/char_eight_head.png";

const icons = {
  one: char_one_head,
  two: char_two_head,
  three: char_three_head,
  four: char_four_head,
  five: char_five_head,
  six: char_six_head,
  seven: char_seven_head,
  eight: char_eight_head,
};

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");
  const [avatar, setAvatar] = useState("one");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const PASSWORD_ERROR =
    "Password must be between 8 and 48 characters and contain at least one lowercase letter, one uppercase letter, one number, and one special character";

  const USERNAME_ERROR = "Username must be between 3 and 16 characters";

  const USERNAME_TAKEN_ERROR = "Username is already taken";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUsernameError("");
    setPasswordError("");

    let validated = true;

    if (!validateUsername()) {
      setUsernameError(USERNAME_ERROR);
      validated = false;
    }
    if (!(await validateUniqueUsername())) {
      setUsernameError(USERNAME_TAKEN_ERROR);
      validated = false;
    }
    if (!validatePassword()) {
      setPasswordError(PASSWORD_ERROR);
      validated = false;
    }
    if (!validateConfirm()) {
      setPasswordError("Passwords do not match");
      validated = false;
    }

    if (!validated) return;

    const hashedPassword = CryptoJS.SHA256(password).toString();

    const user = {
      username: username,
      password: hashedPassword,
      avatar_id: avatar,
    };

    const insertUser = async () => {
      const { data, error } = await supabase.from("users").insert([user]);
      if (error) {
        console.log(error);
        return;
      }
      console.log(data);
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ username, password: hashedPassword })
      );
      window.location.href = `/users/${username}`;
    };

    insertUser();
  };

  const validateUsername = () => {
    const regex = /^[a-zA-Z0-9._]+$/;
    return username.length > 3 && username.length <= 16 && regex.test(username);
  };

  const validateUniqueUsername = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username);
    if (error) {
      console.log(error);
      return;
    }
    return data.length === 0;
  };

  const validatePassword = () => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    return (
      password.length >= 8 && password.length <= 48 && regex.test(password)
    );
  };

  const validateConfirm = () => {
    return password === confirmPassword;
  };

  return (
    <div className="sign-up">
      <h1>Sign up for Devmons!</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </label>

        <p>
          IMPORTANT:<br></br> This project is just for fun and does not (yet)
          implement secure authentication. Please do not use a password that you
          use for other accounts.
        </p>
        <div className="avatar-selector">
          <h2>Choose your avatar!</h2>
          <div className="avatar-container">
            <div
              className={`avatar ${avatar == "one" ? "selected" : ""}`}
              onClick={() => setAvatar("one")}
            >
              <img src={icons.one} alt="" />
            </div>
            <div
              className={`avatar ${avatar == "two" ? "selected" : ""}`}
              onClick={() => setAvatar("two")}
            >
              <img src={icons.two} alt="" />
            </div>
            <div
              className={`avatar ${avatar == "three" ? "selected" : ""}`}
              onClick={() => setAvatar("three")}
            >
              <img src={icons.three} alt="" />
            </div>
            <div
              className={`avatar ${avatar == "four" ? "selected" : ""}`}
              onClick={() => setAvatar("four")}
            >
              <img src={icons.four} alt="" />
            </div>
            <div
              className={`avatar ${avatar == "five" ? "selected" : ""}`}
              onClick={() => setAvatar("five")}
            >
              <img src={icons.five} alt="" />
            </div>
            <div
              className={`avatar ${avatar == "six" ? "selected" : ""}`}
              onClick={() => setAvatar("six")}
            >
              <img src={icons.six} alt="" />
            </div>
            <div
              className={`avatar ${avatar == "seven" ? "selected" : ""}`}
              onClick={() => setAvatar("seven")}
            >
              <img src={icons.seven} alt="" />
            </div>
            <div
              className={`avatar ${avatar == "eight" ? "selected" : ""}`}
              onClick={() => setAvatar("eight")}
            >
              <img src={icons.eight} alt="" />
            </div>
          </div>
        </div>
        <div className="error">{usernameError ? usernameError : ""}</div>
        <div className="error">{passwordError ? passwordError : ""}</div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
