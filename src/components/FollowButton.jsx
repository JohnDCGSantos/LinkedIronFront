import { useState, useEffect } from 'react'
import axios from 'axios'
import { apiBaseUrl } from "../config";

const FollowButton = ({ userId, followUserId, onFollow, onUnfollow }) => {
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const isUserFollowed = localStorage.getItem(`follow_${followUserId}`)
    setIsFollowing(!!isUserFollowed)
  }, [followUserId])

  const handleFollow = async () => {
    try {
      setIsLoading(true)
      const token = localStorage.getItem('authToken')
      await axios.post(
        `${apiBaseUrl}/follow/users/${userId}/follow`,
        { userId, followUserId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setIsFollowing(true)
      //onFollow && onFollow()
      localStorage.setItem(`follow_${followUserId}`, 'true')
      onFollow && onFollow()
    } catch (error) {
      console.error('Error following user:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUnfollow = async () => {
    try {
      setIsLoading(true)
      const token = localStorage.getItem('authToken')
      await axios.delete(`${apiBaseUrl}/follow/users/${userId}/follow`, {
        data: { userId, unfollowUserId: followUserId }, // Use followUserId directly
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setIsFollowing(false)
      localStorage.removeItem(`follow_${followUserId}`)
      onUnfollow && onUnfollow()
    } catch (error) {
      console.error('Error unfollowing user:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button onClick={isFollowing ? handleUnfollow : handleFollow} disabled={isLoading}>
      {isLoading ? 'Loading...' : isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  )
}

export default FollowButton
