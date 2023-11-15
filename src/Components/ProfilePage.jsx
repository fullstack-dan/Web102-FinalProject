import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../client";

function ProfilePage() {
  const { username } = useParams();

  const [user, setUser] = useState(null);

  localStorage.setItem("currentUser", JSON.stringify({ username: "test" }));

  const currentUser = localStorage.getItem("currentUser");
  const sessionActive = () =>
    currentUser && JSON.parse(currentUser).username === username;

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("username", username);
      if (error) {
        console.log(error);
        return;
      }
      setUser(data[0]);
    };
    getUser();
  }, []);

  if (sessionActive()) {
    const pwd = JSON.parse(currentUser).password;
    const checkPassword = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("username", username);
      if (error) {
        console.log(error);
        return;
      }
      if (data[0].password !== pwd) {
        localStorage.removeItem("currentUser");
        window.location.href = "/";
      }
    };
    checkPassword();
  }

  return (
    <div>
      {user ? (
        sessionActive() ? (
          <OwnerProfile />
        ) : (
          <OtherProfile />
        )
      ) : (
        <NoUser />
      )}
    </div>
  );
}

const OwnerProfile = (user) => {
  return (
    <div>
      <h1>Owner Profile</h1>
      <p>Welcome to your profile page!</p>
    </div>
  );
};

const OtherProfile = (user) => {
  return (
    <div>
      <h1>Other Profile</h1>
      <p>Welcome to the profile page!</p>
    </div>
  );
};

const NoUser = () => {
  return (
    <div>
      <h1>No User</h1>
      <p>There is no user with that username.</p>
    </div>
  );
};

export default ProfilePage;
