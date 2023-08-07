import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostForm from "./PostForm";

function PostItem() {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState(0);

  const fetchAllPosts = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.get(`http://localhost:5005/posts/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const allPosts = response.data;
      setPosts(response.data);
      console.log(allPosts);
    } catch (error) {
      console.log("Error fetching all posts", error);
    }
  };
  const handleNewPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {posts.map((post) => (
          <div key={post._id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={post.image_url}
                alt="beerImg"
                className="card-img-top"
                style={{ width: "70px" }}
              />
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.content}</p>
                <p className="card-text">Author: {post.author}</p>
                <p className="card-text">Category: {post.category}</p>
                <p className="card-text">Created At: {post.createdAt}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => setLikes(likes + 1)}
                  >
                    {likes} Likes
                  </button>
                  <Link to={`/posts/${post._id}`} className="btn btn-secondary">
                    Check Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostItem;
