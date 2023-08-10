import { useState, useEffect } from 'react'
import axios from 'axios'
import { apiBaseUrl } from '../config'
import { useNavigate } from 'react-router-dom' // Import useNavigate

export const useFollowToggle = (userId, followUserId) => {
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate() // Get the navigate function

  useEffect(() => {
    const storedIsFollowing = localStorage.getItem(`follow_${followUserId}`)
    setIsFollowing(!!storedIsFollowing)
  }, [followUserId])

  const toggleFollow = async () => {
    setIsLoading(true)
    const token = localStorage.getItem('authToken')

    try {
      if (isFollowing) {
        await axios.delete(`${apiBaseUrl}/follow/users/${userId}/follow`, {
          data: { userId, unfollowUserId: followUserId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setIsFollowing(false)
        localStorage.removeItem(`follow_${followUserId}`)
      } else {
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
        localStorage.setItem(`follow_${followUserId}`, 'true')
      }
      navigate('/users') // Change '/users' to the desired page
    } catch (error) {
      console.error('Error toggling follow:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return { isFollowing, isLoading, toggleFollow }
}
