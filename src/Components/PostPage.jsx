import { useParams } from "react-router-dom";
import Post from "./Post";
import { useEffect, useState } from "react";
import supabase from "../client";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      const { data } = await supabase
        .from("posts")
        .select("*")
        .filter("id", "eq", id);
      setPost(data[0]);
    };
    getPost();
  }, [id]);

  return <>{post && <Post thisPost={post} feedPreview={false} />}</>;
};

export default PostPage;
