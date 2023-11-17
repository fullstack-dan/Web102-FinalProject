import React from "react";
import Post from "./Post";
import "./Feed.css";
import supabase, { validateSession } from "../client";
import { useEffect, useState } from "react";

const sortPosts = (posts) => {
  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });
  return sortedPosts;
};

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [addPost, setAddPost] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState(false);

  const getPosts = async () => {
    const { data } = await supabase.from("posts").select("*");
    return sortPosts(data);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      setPosts(posts);
    };

    fetchPosts();
  }, []);

  const AddPostForm = () => {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");

    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
      const checkSession = async () => {
        const validSession = await validateSession();
        setIsLoggedIn(validSession);
      };

      checkSession();
    }, []);

    if (!isLoggedIn) {
      return (
        <div className="add-post-form">
          <p>You must be logged in to post!</p>
        </div>
      );
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validatePost()) {
        alert("Please fill out all fields!");
        return;
      }
      const currentUser = await validateSession();
      const author = currentUser.username;
      const { data, error } = await supabase
        .from("posts")
        .insert({
          title,
          content,
          author,
        })
        .select();
      if (error) {
        console.log(error);
      }
      setPosts(sortPosts([...posts, data[0]]));
      setAddPost(false);
    };

    const validatePost = () => {
      if (title.length < 1 || content.length < 1) {
        return false;
      }
      return true;
    };

    return (
      <form className="add-post-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="Content"
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    );
  };

  const Controls = () => {
    const [search, setSearch] = useState("");

    const handleSearchClick = () => {
      setShowSearch(!showSearch);
    };

    const handleReset = async () => {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    };

    const handleSearch = async () => {
      const fetchedPosts = await getPosts();
      const results = fetchedPosts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      );
      setPosts(results);
    };

    const handleSortByDate = () => {
      setPosts(sortPosts([...posts]));
    };

    const handleSortByLikes = () => {
      const sortedPosts = [...posts].sort((a, b) => {
        return b.likes - a.likes;
      });
      setPosts(sortedPosts);
    };

    return (
      <div className="feed-controls">
        <div className="search-controls">
          <div className="search-button" onClick={handleSearchClick}>
            🔎
          </div>
          {showSearch ? (
            <div className="search-bar">
              <input
                type="text"
                placeholder=""
                onChange={(e) => setSearch(e.target.value)}
              />
              <div onClick={handleSearch}>Search</div>
            </div>
          ) : null}
          <div className="reset" onClick={handleReset}>
            🔄
          </div>
        </div>
        <div className="sort-controls">
          <div onClick={handleSortByDate}>Sort by date</div>
          <div onClick={handleSortByLikes}>Sort by likes</div>
        </div>
      </div>
    );
  };

  return (
    <div className="feed">
      <h1 className="feed-title">Check out what people are saying!</h1>
      <button className="add-post" onClick={() => setAddPost(!addPost)}>
        Add a post
      </button>
      {addPost ? <AddPostForm /> : null}
      <div className="feed-container">
        <Controls />
        {posts.map((post) => (
          <Post key={post.id} thisPost={post} feedPreview={true} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
