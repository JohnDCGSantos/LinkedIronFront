import axios from 'axios'
import {useState} from 'react'

function PostItem () {
    const [posts, setPosts] = useState([])

    const fetchAllPosts = async () =>{
        try {
            const response = await axios.get(
                `http://localhost:5005/api/posts`)
        const allPosts = response.data
        setPosts(response.data)
        } catch (error) {
            console.log('Error fetching all posts', error)
        }
    }
    return(
        <>

{/* {<div>
      <button onClick={() => setLikes(likes + 1)}>
      {likes} Likes </button>
      </div> */}
        </>}
    )
}

export default PostItem