import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/Auth.context";
import PostForm from "../components/PostForm";

function EditPostPage() {
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

  const handleSubmit = async (payload) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.put(
        `http://localhost:5005/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.status === 200) {
        const updatedPost = await response.json();
        nav(`/posts/${updatedPost._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const isAuthor = post.author === user._id;

  return (
    <div>
      <h1>Edit Post</h1>
      {isAuthor ? (
        <PostForm
          onSubmit={(updatedPostData) => {
            handleSubmit(updatedPostData);
            console.log("Updated post data:", updatedPostData);
          }}
          defaultValues={{
            title: post.title,
            content: post.content,
            category: post.category,
          }}
        />
      ) : (
        <p>You are not authorized to edit this post.</p>
      )}
    </div>
  );
}

export default EditPostPage;
