import React from "react";
import { useState, useEffect } from "react";
import supabase from "../client";
import { validateSession } from "../client";
import "./ProfilePage.css";

import LoginPage from "./LoginPage";
import SignUp from "./SignUp";

function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const data = await validateSession();
      if (data) {
        setUser(data);
      }
    };
    getCurrentUser();
  }, []);

  return <div>{user ? <OwnerProfile user={user} /> : <LoginPage />}</div>;
}

const OwnerProfile = ({ user }) => {
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/profile";
  };

  return (
    <div className="profile-page">
      <h1>Your Profile</h1>
      <h2>{user.username}</h2>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default ProfilePage;
