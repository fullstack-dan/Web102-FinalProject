import React from "react";
import "./Banner.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../client";
import { validateSession } from "../client";

const Banner = () => {
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

  return (
    <div id="banner">
      {user ? (
        <p>
          <Link to="/profile">Logged in as: {user.username}</Link>
        </p>
      ) : (
        <p>
          <Link to="/login">Log in to start your adventure!</Link>
        </p>
      )}
    </div>
  );
};

export default Banner;
