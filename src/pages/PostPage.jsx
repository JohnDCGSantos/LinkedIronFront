import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Post from "../components/Post";
import { apiBaseUrl } from "../config";

function PostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPost = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.get(
        `${apiBaseUrl}/posts/${postId}`,
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

  return (
      <div className="d-flex justify-content-center">
        <Post key={post._id} post={post} />
      </div>
  );
}
export default PostPage;
