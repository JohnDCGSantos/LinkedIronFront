import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import FollowButton from '../components/FollowButton'
import { AuthContext } from '../context/Auth.context'
import '../Users.css'
import { apiBaseUrl } from '../config'
import UserImage from '../components/UserImage'

function UsersList() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const authContext = useContext(AuthContext) // Use the AuthContext directly

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('authToken')
      try {
        const response = await axios.get(`${apiBaseUrl}/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const usersData = response.data
        setUsers(usersData)
        setIsLoading(false)
      } catch (error) {
        console.log('Error fetching users', error)
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const handleFollow = followUserId => {
    // Logic to handle follow action
    console.log(`Followed user ${followUserId}`)
  }

  const handleUnfollow = followUserId => {
    // Logic to handle unfollow action
    console.log(`Unfollowed user ${followUserId}`)
  }
  if (isLoading) {
    return <div>Loading...</div>
  }
  const filteredUsers = users.filter(
    user =>
      user._id !== authContext.user._id &&
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) // Filter users by search query
  )

  return (
    <div className='users-list-container'>
      <h2>Iron Users</h2>
      <input
        type='text'
        placeholder='Search users by name'
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <ul className='users-list'>
        {filteredUsers.map(user => (
          <li key={user._id} className='user-item'>
            <UserImage user={user} width='30' />
            {user.username}
            <FollowButton
              userId={authContext.user._id}
              followUserId={user._id}
              onFollow={() => handleFollow(user._id)}
              onUnfollow={() => handleUnfollow(user._id)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UsersList
