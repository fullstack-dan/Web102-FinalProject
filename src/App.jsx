import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar";
import Post from "./Components/Post";
import Feed from "./Components/Feed";
import PostPage from "./Components/PostPage";
import supabase from "./client";

const examplePosts = [
  {
    id: 0,
    title: "Help!",
    author: "AshKetchum",
    content: `Bro, I'm stuck in the Viridian Forest and I can't find my way out.`,
    likes: 17,
    comments: [
      {
        author: "May",
        time: "Today at 02:30 PM",
        content: "Good luck!",
        likes: 2,
        icon: "/src/assets/char_two_head.png",
      },
      {
        author: "Brock",
        time: "Today at 02:35 PM",
        content: "Lol L mans",
        likes: 0,
        icon: "/src/assets/char_four_head.png",
      },
    ],
  },
  {
    id: 1,
    title: "New Pokeball Design",
    author: "TeamRocket",
    content: `Check out our latest Pokeball design. Any thoughts?`,
    likes: 30,
    comments: [
      {
        author: "Jessie",
        time: "Today at 11:00 AM",
        content: "Looks amazing! Can't wait to use it.",
        likes: 20,
        icon: "/src/assets/char_five_head.png",
      },
      {
        author: "James",
        time: "Today at 11:05 AM",
        content: "This is our best invention yet!",
        likes: 18,
        icon: "/src/assets/char_six_head.png",
      },
    ],
  },
  {
    id: 2,
    title: "Can't beat the Elite Four!",
    author: "Misty",
    content: `I've been trying to defeat the Elite Four for hours now. Any tips on a good strategy?`,
    likes: 45,
    comments: [
      {
        author: "Professor Oak",
        time: "Yesterday at 09:15 PM",
        content: "Remember to balance your team types!",
        likes: 15,
        icon: "/src/assets/char_one_head.png",
      },
      {
        author: "Gary",
        time: "Yesterday at 10:00 PM",
        content: "Just keep training!",
        likes: 5,
        icon: "/src/assets/char_three_head.png",
      },
    ],
  },
];

function App() {
  const [count, setCount] = useState(0);

  function WelcomePage() {
    return (
      <div id="welcome-page" className="fade-in">
        <img
          src="src/assets/masterball.png"
          alt=""
          style={{
            width: "40px",
            height: "40px",
          }}
        />
        <div>
          <h1>Welcome to devmons!</h1>
          <div>Made with love, inspired by Pokemon Emerald.</div>
        </div>
        <button>Join Devmons!</button>
      </div>
    );
  }

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/post/:id" element={<PostPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
