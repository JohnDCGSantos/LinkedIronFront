import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { apiBaseUrl } from '../config'
//import LikeButton from './LikeButton'

const PostItem = () => {
  const [posts, setPosts] = useState([])

  const fetchAllPosts = async () => {
    const token = localStorage.getItem('authToken')

    try {
      const response = await axios.get(`${apiBaseUrl}/posts/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const allPosts = response.data
      setPosts(allPosts)
      console.log(allPosts)
    } catch (error) {
      console.log('Error fetching all posts', error)
    }
  }

  useEffect(() => {
    fetchAllPosts()
  }, [])

  return (
    <div>
      <p>Posts: </p>
      {posts.map(post => (
        <div key={post._id}>
          <img src={post.image_url} alt='beerImg' style={{ width: '70px' }} />
          <h1>{post.author}</h1>
          <p>{post.title}</p>
          <p>{post.content}</p>
          <h1>{post.category}</h1>
          <p>{post.createdAt}</p>

          <Link to={`/posts/${post._id}`}>Check the details</Link>
        </div>
      ))}
    </div>
  )
}

export default PostItem
