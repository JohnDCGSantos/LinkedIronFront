import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/Auth.context";
import Post from "../components/Post";

function PostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const fetchPost = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.get(
        `http://localhost:5005/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const post = response.data;
      console.log(post);
      setPost(post);
    } catch (error) {
      console.log("Error fetching post", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const isAuthor = post.author === user._id;
  return (
    <div>
      <h1>Post details</h1>
      <div>
        <Post key={post._id} post={post} isEditable={isAuthor} />
      </div>
    </div>
  );
}
export default PostPage;
