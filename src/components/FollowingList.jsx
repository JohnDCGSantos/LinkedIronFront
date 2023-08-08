import { useEffect, useState } from 'react'
import axios from 'axios'

const FollowingList = () => {
  const [followingUsers, setFollowingUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('authToken')

    const fetchFollowingUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5005/follow/following', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setFollowingUsers(response.data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching following users:', error)
        setIsLoading(false)
      }
    }

    fetchFollowingUsers()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Following List</h2>
      <ul>
        {followingUsers.map(user => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
    </div>
  )
}

export default FollowingList
