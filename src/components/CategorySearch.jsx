import { useState } from 'react'
import axios from 'axios'
import { apiBaseUrl } from '../config'
import { Link } from 'react-router-dom'

const CategorySearch = () => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [posts, setPosts] = useState([])

  const handleCategoryChange = event => {
    setSelectedCategory(event.target.value)
  }

  const handleSearch = async () => {
    const token = localStorage.getItem('authToken')

    try {
      const response = await axios.get(`${apiBaseUrl}/posts/category/${selectedCategory}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setPosts(response.data)
    } catch (error) {
      console.log('Error fetching posts by category', error)
    }
  }

  return (
    <div>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value=''>Select a category</option>
        <option value='careers'>Careers</option>
        <option value='events'>Events</option>
        <option value='profiles'>Profiles</option>
        <option value='other'>Other</option>
      </select>
      <button onClick={handleSearch}>Search</button>

      <div>
        {posts.map(post => (
          <div key={post._id}>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <Link to={`/posts/${post._id}`}>Read More</Link>

            {/* Render other post details here */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategorySearch
