import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Post from '../components/Post'
import { AuthContext } from '../context/Auth.context'
import { apiBaseUrl } from '../config'
import CategorySearch from '../components/CategorySearch.jsx'
const Feed = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useContext(AuthContext)

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
    <div>
      <h1>Feed</h1>
      <CategorySearch />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {posts.map(post => {
            return <Post key={post._id} post={post} isCompact={true} />
          
          })}
        </div>
      )}
      
    </div>
  )
}

export default Feed
