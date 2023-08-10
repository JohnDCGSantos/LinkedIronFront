import { useState, useEffect } from 'react'
import axios from 'axios'
import Post from '../components/Post'
//import { AuthContext } from '../context/Auth.context'
import { apiBaseUrl } from '../config'
import CategorySearch from '../components/CategorySearch.jsx'
import UserCardFeed from '../components/UserCardFeed'

const Feed = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  //const { user } = useContext(AuthContext)

  useEffect(() => {
    const fetchAllPosts = async () => {
      const token = localStorage.getItem('authToken')

      try {
        const response = await axios.get(`${apiBaseUrl}/posts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const allPosts = response.data
        setPosts(response.data)
        console.log(allPosts)
      } catch (error) {
        console.log('Error fetching all posts', error)
      }
      setIsLoading(false)
    }

    fetchAllPosts()
  }, [])

  return (
    <div className="feed-container">
    <div className="left-sidebar">
           <UserCardFeed user={user} isEditable={true} />
    </div>
    <div className="main-content">
           <h1>Feed</h1>
      <CategorySearch />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="post-list">
          {posts.map(post => (
            <Post key={post._id} post={post} isCompact={true} />
          ))}
        </div>
      )}
    </div>
    <div className="right-sidebar">
      
    </div>
  </div>
  
  );
  
}

export default Feed
