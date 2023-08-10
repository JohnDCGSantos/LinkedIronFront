import { useEffect, useState } from 'react'
import axios from 'axios'
import { apiBaseUrl } from '../config'
import UserImage from './UserImage'

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
      {followerUsers.map(user => (
        <li key={user._id}>
          <UserImage user={user} width='30' />

          <div className='itemsName'>{user.username}</div>
        </li>
      ))}
    </div>
  )
}

export default FollowerList
