import { useState, useEffect } from 'react'
import axios from 'axios'
import { apiBaseUrl } from '../config'
const LikeButton = ({ postId, likePostId, onLike, onUnlike }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const isPostLiked = localStorage.getItem(`like_${likePostId}`)
    setIsLiked(!!isPostLiked)
  }, [likePostId])
  const handleLike = async () => {
    try {
      setIsLoading(true)
      const token = localStorage.getItem('authToken')
      await axios.post(
        `${apiBaseUrl}/posts/${postId}/like`,
        {
          postId,
          likePostId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setIsLiked(true)
      localStorage.setItem(`like_${postId}`, 'true')
      onLike && onLike()
    } catch (error) {
      console.error('Error liking post:', error)
    }
  }
  const handleUnlike = async () => {
    try {
      setIsLoading(true)
      const token = localStorage.getItem('authToken')
      await axios.delete(`${apiBaseUrl}/posts/${postId}/like`, {
        data: { postId, unlikePostId: likePostId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setIsLiked(true)
      localStorage.removeItem(`like_${postId}`)
      onUnlike && onUnlike()
    } catch (error) {
      console.error('Error unliking post:', error)
    }
  }
  return (
    <>
      <button onClick={isLiked ? handleUnlike : handleLike} disabled={isLoading}>
        {isLiked ? 'Unlike' : 'Like'}
      </button>
      <span>{isLiked} </span>
    </>
  )
}
export default LikeButton
