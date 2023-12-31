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
import LoginPage from "./Components/LoginPage";
import Banner from "./Components/Banner";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/post/:id" element={<PostPage />} />
        </Routes>
        {/* <Banner /> */}
      </Router>
    </>
  );
}

function WelcomePage() {
  return (
    <div id="welcome-page" className="">
      <img src={masterball_img.default} alt="" />
      <div>
        <h1>Welcome to Devmons!</h1>
        <div>Made with love, inspired by Pokemon Emerald.</div>
      </div>
      <Link to="/signup">
        <button>Join Devmons!</button>
      </Link>
    </div>
  );
}

export default App;
