import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Post.css";
import supabase from "../client";

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

const getDate = (timestamp) => {
  const date = new Date(timestamp);
  const today = new Date();
  let normalizedDate = "";
  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    normalizedDate = `Today at ${date.getHours()}:${date.getMinutes()}`;
  } else {
    normalizedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  }
  return normalizedDate;
};

function Post({ thisPost, feedPreview }) {
  const [post, setPost] = useState(thisPost);
  const [author, setAuthor] = useState({
    username: "",
    icon: "",
  });
  const [displayContent, setDisplayContent] = useState("");
  const [comments, setComments] = useState(null);
  const [addComment, setAddComment] = useState(false);

  useEffect(() => {
    const getComments = async () => {
      const { data } = await supabase
        .from("comments")
        .select("*")
        .filter("post_id", "eq", post.id);
      setComments(data);
    };
    getComments();

    const getAuthor = async () => {
      const { data } = await supabase
        .from("users")
        .select("*")
        .filter("username", "eq", post.author);
      setAuthor({
        username: data[0].username,
        icon: icons[data[0].avatar_id],
      });
    };
    getAuthor();
  }, [post]);

  useEffect(() => {
    if (feedPreview) {
      setDisplayContent(post.content.slice(0, 200) + "...");
    } else {
      setDisplayContent(post.content);
    }
  }, [post, feedPreview]);

  const PostDiv = (post) => {
    const [likes, setLikes] = useState(post.likes);

    const handlePostUpvote = async () => {
      const { data, error } = await supabase
        .from("posts")
        .update({ likes: likes + 1 })
        .eq("id", post.id);
      if (error) {
        console.log(error);
      }
      setLikes(likes + 1);
    };

    return (
      <div className="post">
        <div className="user-info">
          <img src={author.icon} alt="" />
          <div className="user-text-info">
            <h3 className="user-name">{post.author}</h3>
            <p className="post-date">{getDate(post.created_at)}</p>
          </div>
        </div>
        <div className="post-text-info">
          <h2 className="post-title">{post.title}</h2>
          <p className="post-content">{displayContent}</p>
        </div>
        <div className="likes">
          <span>{likes}</span>
          <div className="upvote" onClick={handlePostUpvote}>
            ♡
          </div>
        </div>
      </div>
    );
  };

  const Comment = ({ comment }) => {
    const [icon, setIcon] = useState("");
    const [likes, setLikes] = useState(comment.likes);

    useEffect(() => {
      const getIcon = async (author) => {
        const { data } = await supabase
          .from("users")
          .select("avatar_id")
          .filter("username", "eq", author);

        setIcon(icons[data[0].avatar_id]);
      };
      getIcon(comment.author);
    }, [comment]);

    const handleCommentUpvote = async () => {
      const { data, error } = await supabase
        .from("comments")
        .update({ likes: likes + 1 })
        .eq("id", comment.id);

      if (error) {
        console.log(error);
      } else {
        setLikes(likes + 1);
      }
    };

    return (
      <div className="comments">
        <div className="comment" key={comment.id}>
          <div className="user-info">
            <img src={icon} alt="" />
            <div className="user-text-info">
              <h3 className="user-name">{comment.author}</h3>
              <p className="post-date">{getDate(comment.created_at)}</p>
            </div>
          </div>
          <div className="post-text-info">
            <p className="post-content">{comment.content}</p>
          </div>
          <div className="likes">
            <span>{likes}</span>
            <div className="upvote" onClick={handleCommentUpvote}>
              ♡
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AddCommentForm = () => {
    const [comment, setComment] = useState("");

    const updateComment = (e) => {
      setComment(e.target.value);
    };

    const handleAddComment = async () => {
      const currentUser = localStorage.getItem("currentUser");
      const username = JSON.parse(currentUser).username;
      const { data, error } = await supabase
        .from("comments")
        .insert([
          {
            content: comment,
            post_id: post.id,
            author: username,
          },
        ])
        .select();
      if (error) {
        console.log(error);
      }
      setComment("");
      setAddComment(false);
      updateComments(data[0]);
    };

    return (
      <div className="add-comment-form">
        <textarea
          name="comment"
          id="comment"
          cols="30"
          rows="10"
          placeholder="Add a comment..."
          onChange={updateComment}
          maxLength={200}
        ></textarea>
        <button onClick={handleAddComment}>Post</button>
      </div>
    );
  };

  const updateComments = (newComment) => {
    setComments([...comments, newComment]);
  };

  return (
    <div
      className={feedPreview ? "post-preview post-container" : "post-container"}
    >
      {feedPreview ? (
        <Link to={`/post/${post.id}`}>{PostDiv(post)}</Link>
      ) : (
        <>
          {PostDiv(post)}
          <p className="add-comment" onClick={() => setAddComment(!addComment)}>
            Add a comment +
          </p>
          {addComment && <AddCommentForm />}
          <div className="comments">
            {comments &&
              comments.map((comment) => (
                <Comment comment={comment} key={comment.id} />
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Post;
