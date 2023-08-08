import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../context/Auth.context";
import PostForm from "../components/PostForm";
import { apiBaseUrl } from "../config";
import CloudinaryUpload from "../components/CloudinaryUpload";

function EditPostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [allMedia, setAllMedia] = useState([]);
  const nav = useNavigate();

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
      setAllMedia(post.media);
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

      const postDataWithMedia = { ...payload, media: allMedia };
      const response = await axios.put(
        `${apiBaseUrl}/posts/${postId}`,
        postDataWithMedia,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const updatedPost = await response.data;
        nav(`/posts/${updatedPost._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.delete(
        `${apiBaseUrl}/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        nav(`/feed`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateMediaList = (updatedMedia) => {
    setAllMedia(updatedMedia);
  };

  const isAuthor = post.author === user._id;

  return (
    <div>
      <h1>Edit Post</h1>
      {isAuthor ? (
        <>
          <CloudinaryUpload initialMedia={allMedia} onMediaUpdated={updateMediaList} />
          <PostForm
            onSubmit={async (updatedPostData) => {
              console.log("Updated post data:", updatedPostData);
              await handleSubmit(updatedPostData);
            }}
            defaultValues={{
              title: post.title,
              content: post.content,
              category: post.category,
            }}
          />
          <button className="btn btn-danger" onClick={handleDelete}>Delete post</button>
        </>
      ) : (
        <p>You are not authorized to edit this post.</p>
      )}
    </div>
  );
}

export default EditPostPage;
