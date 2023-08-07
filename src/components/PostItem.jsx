import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PostForm from './PostForm'

function PostItem () {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [likes, setLikes] = useState(0)
    const fetchAllPosts = async () =>{
        try {
            const token = localStorage.getItem('authToken')
            const response = await axios.get(
                `http://localhost:5005/posts/posts`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                const allPosts = response.data
                setPosts(allPosts)
        setLoading(false)
        
        
        console.log(allPosts)
        } catch (error) {
            console.log('Error fetching all posts', error)
            setLoading(false)
        }
    }

    useEffect(() =>{
        fetchAllPosts();
    }, [])

    if (loading) {
        return <p>Loading posts...</p>
      }
      if (error) {
        return <p>{error}</p>
      }
    
    return(
        <>
         
        {posts.map(post =>{
            return(
        <div key={post._id}>
        <img src={post.image_url} alt='beerImg' style={{width: '70px'}} />
        <h1>{post.author}</h1>
        <p>{post.title}</p>
        <p>{post.content}</p>
        <h1>{post.category}</h1>
        <p>{post.createdAt}</p>
        {/* <button onClick={() => setLikes(likes + 1)}>
      {likes} Likes </button>
        <Link to={`/posts/${post._id}`} >Check the details</Link> */}
        </div>
        )

    })}
        </>
    )
}

export default PostItem