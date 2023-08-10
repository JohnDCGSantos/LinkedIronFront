import { useState } from 'react'
import axios from 'axios'
import { apiBaseUrl } from '../config'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../CategorySearch.css'

const CategorySearch = () => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [posts, setPosts] = useState([])
  const [hasResults, setHasResults] = useState(false)

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
      setHasResults(response.data.length > 0)
    } catch (error) {
      console.log('Error fetching posts by category', error)
    }
  }

  return (
    <div className='category-search-container'>
      <div className='input-group mb-3'>
        <select className='form-select' value={selectedCategory} onChange={handleCategoryChange}>
          <option value=''>Select a category</option>
          <option value='careers'>Careers</option>
          <option value='events'>Events</option>
          <option value='profiles'>Profiles</option>
          <option value='other'>Other</option>
        </select>
        <button className='btn btn-primary' onClick={handleSearch}>
          Search
        </button>
      </div>

      {hasResults && posts.length > 0 ? (
        <div id='carouselExampleControls' className='carousel slide' data-bs-ride='carousel'>
          <div className='carousel-inner'>
            {posts.map((post, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={post._id}>
                <div className='card'>
                  <div className='card-body'>
                    <h5 className='card-title'>{post.title}</h5>
                    <p className='card-text small-text'>{post.content}</p>
                    <Link to={`/posts/${post._id}`} className='btn btn-primary'>
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className='carousel-control-prev'
            type='button'
            data-bs-target='#carouselExampleControls'
            data-bs-slide='prev'
          >
            <span className='carousel-control-prev-icon' aria-hidden='true'></span>
            <span className='visually-hidden'>Previous</span>
          </button>
          <button
            className='carousel-control-next'
            type='button'
            data-bs-target='#carouselExampleControls'
            data-bs-slide='next'
          >
            <span className='carousel-control-next-icon' aria-hidden='true'></span>
            <span className='visually-hidden'>Next</span>
          </button>
        </div>
      ) : null}

      {hasResults && posts.length === 0 ? (
        <div>
          <p>No results found.</p>
        </div>
      ) : null}

      {hasResults ? (
        <Link to={`/posts/category/${selectedCategory}`} className='btn btn-primary mt-3'>
          See All Posts in {selectedCategory} Category
        </Link>
      ) : null}
    </div>
  )
}

export default CategorySearch
