import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import FollowButton from '../components/FollowButton'
import { AuthContext } from '../context/Auth.context'
import '../Users.css'
import { apiBaseUrl } from '../config'

function FollowingList() {
  const [followingUsers, setFollowingUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const authContext = useContext(AuthContext) // Use the AuthContext directly

  useEffect(() => {
    const fetchFollowingUsers = async () => {
      const token = localStorage.getItem('authToken')
      try {
        const response = await axios.get(`${apiBaseUrl}/follow/following`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const followingUsersData = response.data
        setFollowingUsers(followingUsersData)
        setIsLoading(false)
      } catch (error) {
        console.log('Error fetching following users', error)
        setIsLoading(false)
      }
    }

    fetchFollowingUsers()
  }, [])

  const handleUnfollow = followUserId => {
    console.log(`Unfollowed user ${followUserId}`)
  }
  if (isLoading) {
    return <div>Loading...</div>
  } else
    return (
      <div className='following-list-container'>
        <h2>Following List</h2>
        <ul className='users-list'>
          {followingUsers.map(user => (
            <li key={user._id} className='user-item'>
              {user.username}
              <FollowButton
                userId={authContext.user._id}
                followUserId={user._id}
                onUnfollow={() => handleUnfollow(user._id)} // Call handleUnfollow function
              />
            </li>
          ))}
        </ul>
      </div>
    )
}

export default FollowingList
