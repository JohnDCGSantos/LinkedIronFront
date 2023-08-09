import axios from 'axios'
import { useState } from 'react'
import { apiBaseUrl } from '../config'

function LikeButton({ userId, postId, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes)
  const [isLoading, setIsLoading] = useState(false)

  const handleLike = async () => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem('authToken')
      const response = await axios.post(
        `${apiBaseUrl}/posts/${postId}/like`,
        { userId, postId, initialLikes },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setLikes(response.data.likes)
    } catch (error) {
      console.error('Error liking post:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button onClick={handleLike} disabled={isLoading}>
      {isLoading ? 'Liking...' : `${likes} Likes`}
    </button>
  )
}

export default LikeButton
