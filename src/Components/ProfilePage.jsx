import React from "react";
import { useState, useEffect } from "react";
import supabase from "../client";
import { validateSession } from "../client";
import "./ProfilePage.css";
import { useNavigate } from "react-router-dom";

import LoginPage from "./LoginPage";
import SignUp from "./SignUp";

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

function ProfilePage() {
  const [user, setUser] = useState(null);
  const Navigate = useNavigate();

  const getCurrentUser = async () => {
    const data = await validateSession();
    if (data) {
      setUser(data);
    } else {
      Navigate("/login");
    }
  };
  useEffect(() => {
    getCurrentUser();
  }, []);

  const OwnerProfile = ({ user }) => {
    const [avatar, setAvatar] = useState(user.avatar_id);

    const handleLogout = () => {
      localStorage.removeItem("currentUser");
      Navigate("/login");
    };

    const handleChangeIcon = () => {
      const updateIcon = async () => {
        const { data, error } = await supabase
          .from("users")
          .update({ avatar_id: avatar })
          .eq("id", user.id);
        if (error) {
          console.log(error);
        }
        getCurrentUser();
      };
      updateIcon();
    };

    return (
      <div className="profile-page">
        <h1>Your Profile</h1>
        <div className="profile-info">
          <img src={icons[user.avatar_id]} alt="icon" />
          <h2>{user.username}</h2>
        </div>
        <div className="change-icon">
          <h3>Change Icon</h3>
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
          <button className="save-button" onClick={handleChangeIcon}>
            Save
          </button>
        </div>
        <button onClick={handleLogout}>Log out</button>
      </div>
    );
  };

  return <div>{user ? <OwnerProfile user={user} /> : <LoginPage />}</div>;
}

export default ProfilePage;
