import { useEffect, useState } from 'react'
import axios from 'axios'
import { apiBaseUrl } from '../config'

const FollowerList = () => {
  const [followerUsers, setFollowerUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('authToken')

    const fetchFollowerUsers = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/follow/followers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setFollowerUsers(response.data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching following users:', error)
        setIsLoading(false)
      }
    }

    fetchFollowerUsers()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Follower List</h2>
      <ul>
        {followerUsers.map(user => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
    </div>
  )
}

export default FollowerList
