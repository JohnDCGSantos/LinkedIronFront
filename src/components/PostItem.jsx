import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostForm from "./PostForm";
import Likes from './Likes'

function PostItem() {
  const [posts, setPosts] = useState([]);
  

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
    <>
    <p>Posts: </p>
      {posts.map((post) => {
        return <div key={post._id}>
          <img src={post.image_url} alt="beerImg" style={{ width: "70px" }} />
          <h1>{post.author}</h1>
          <p>{post.title}</p>
          <p>{post.content}</p>
          <h1>{post.category}</h1>
          <p>{post.createdAt}</p>
          <Likes postId={post._id} />
          <Link to={`/posts/${post._id}`}>Check the details</Link>
        </div>;
      })}
    </>
  );
}

export default PostItem;
