import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Post.css";
import supabase from "../client";

function Post({ thisPost, feedPreview }) {
  const [post, setPost] = useState(thisPost);
  const [displayContent, setDisplayContent] = useState("");
  const [comments, setComments] = useState(null);

  useEffect(() => {
    const getComments = async () => {
      const { data } = await supabase
        .from("comments")
        .select("*")
        .filter("post_id", "eq", post.id);
      setComments(data);
    };
    getComments();
  }, [post]);

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

  useEffect(() => {
    if (feedPreview) {
      setDisplayContent(post.content.slice(0, 200) + "...");
    } else {
      setDisplayContent(post.content);
    }
  }, [post, feedPreview]);

  const handlePostUpvote = () => {
    const updatePost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .update({ likes: post.likes + 1 })
        .eq("id", post.id);
      if (error) {
        console.log(error);
      }
      setPost({ ...post, likes: post.likes + 1 });
    };
    updatePost();
  };

  const handleCommentUpvote = (e) => {
    const commentId = e.currentTarget.getAttribute("data-comment-id");
    const comment = comments.find((comment) => comment.id == commentId);

    const updateComment = async () => {
      const { data, error } = await supabase
        .from("comments")
        .update({ likes: comment.likes + 1 })
        .eq("id", commentId);
      if (error) {
        console.log(error);
      }
      setComments(
        comments.map((comment) => {
          if (comment.id == commentId) {
            return { ...comment, likes: comment.likes + 1 };
          }
          return comment;
        })
      );
    };

    updateComment();
  };

  return (
    <div
      className={feedPreview ? "post-preview post-container" : "post-container"}
    >
      <Link to={`/post/${post.id}`}>
        <div className="post">
          <div className="user-info">
            <img src="/src/assets/char_one_head.png" alt="" />
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
            <span>{post.likes}</span>
            <div className="upvote" onClick={handlePostUpvote}>
              ♡
            </div>
          </div>
        </div>
        {!feedPreview && <p className="add-comment">Add a comment +</p>}
        {!feedPreview && (
          <div className="comments">
            {comments &&
              comments.map((comment) => (
                <div className="comment" key={comment.id}>
                  <div className="user-info">
                    <img src={comment.icon} alt="" />
                    <div className="user-text-info">
                      <h3 className="user-name">{comment.author}</h3>
                      <p className="post-date">{getDate(comment.created_at)}</p>
                    </div>
                  </div>
                  <div className="post-text-info">
                    <p className="post-content">{comment.content}</p>
                  </div>
                  <div className="likes">
                    <span>{comment.likes}</span>
                    <div
                      className="upvote"
                      onClick={handleCommentUpvote}
                      data-comment-id={comment.id}
                    >
                      ♡
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </Link>
    </div>
  );
}

export default Post;
