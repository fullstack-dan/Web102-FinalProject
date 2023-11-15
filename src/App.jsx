import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar";
import Post from "./Components/Post";
import Feed from "./Components/Feed";
import PostPage from "./Components/PostPage";
import * as masterball_img from "./assets/masterball.png";
import SignUp from "./Components/SignUp";
import ProfilePage from "./Components/ProfilePage";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/profile" element={<SignUp />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/users/:username" element={<ProfilePage />} />
          <Route path="/post/:id" element={<PostPage />} />
        </Routes>
      </Router>
    </>
  );
}

function WelcomePage() {
  return (
    <div id="welcome-page" className="fade-in">
      <img src={masterball_img.default} alt="" />
      <div>
        <h1>Welcome to devmons!</h1>
        <div>Made with love, inspired by Pokemon Emerald.</div>
      </div>
      <button>Join Devmons!</button>
    </div>
  );
}

export default App;
