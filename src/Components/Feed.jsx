import React from "react";
import Post from "./Post";
import "./Feed.css";
import supabase from "../client";
import { useEffect, useState } from "react";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const { data } = await supabase.from("posts").select("*");
      setPosts(data);
    };
    getPosts();
  }, []);

  return (
    <div className="feed">
      <h1 className="feed-title">Check out what people are saying!</h1>
      <button className="add-post">Add a post</button>
      <div className="feed-container">
        {posts.map((post) => (
          <Post key={post.id} thisPost={post} feedPreview={true} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
