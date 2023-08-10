import { useState, useEffect } from 'react'
import axios from 'axios'
import { apiBaseUrl } from '../config'
import { useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Post from './Post'
const AllPostsByCategory = () => {
  const { category } = useParams()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPostsByCategory = async () => {
      try {
        const token = localStorage.getItem('authToken')

        const response = await axios.get(`${apiBaseUrl}/posts/category/${category}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setPosts(response.data)
      } catch (error) {
        console.log('Error fetching posts by category', error)
      }
    }

    fetchPostsByCategory()
  }, [category])

  return (
    <div>
      <h1>All Posts in {category} category</h1>
      <div>
        {posts.map(post => (
          <div key={post._id}>
            <Post post={post} isCompact={true} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllPostsByCategory
