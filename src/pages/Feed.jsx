import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Post from "../components/Post";
import { AuthContext } from "../context/Auth.context";
import { apiBaseUrl } from "../config";
import CategorySearch from "../components/CategorySearch.jsx";
import UserCardFeed from "../components/UserCardFeed";
import UsersList from "../components/UsersList";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const fetchAllPosts = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.get(`${apiBaseUrl}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const allPosts = response.data;
      
      // Only update if different
      if (!arraysAreEqual(allPosts, posts)){
        setPosts(response.data);
      }
      console.log(allPosts);
    } catch (error) {
      console.log("Error fetching all posts", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const arraysAreEqual = (array1, array2) => {
    if (array1.length !== array2.length) {
      return false;
    }
    
    for (let i = 0; i < array1.length; i++) {
      if (array1[i]._id !== array2[i]._id) {
        return false;
      }
    }
    
    return true;
  };

  return (
    <div className="feed-container">
      <div className="left-sidebar">
        <UserCardFeed user={user} isEditable={true} />
      </div>
      <div className="main-content">
        <CategorySearch />
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="post-list">
            {posts.map((post) => (
              <Post key={post._id} post={post} isCompact={true} />
            ))}
          </div>
        )}
      </div>
      <div className="right-sidebar">
        <UsersList followingChanged={() => fetchAllPosts()} />
      </div>
    </div>
  );
};

export default Feed;
