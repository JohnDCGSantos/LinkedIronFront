import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import FollowButton from '../components/FollowButton'
import { AuthContext } from '../context/Auth.context'
import '../Users.css'
import { apiBaseUrl } from '../config'
import UserImage from '../components/UserImage'

function UsersList({followingChanged}) {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const {user: userFromContext} = useContext(AuthContext)

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('authToken')
      try {
        const response = await axios.get(`${apiBaseUrl}/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const usersData = response.data.filter(user => !user.isAdmin && (user._id != userFromContext._id));
        setUsers(usersData)
        setIsLoading(false)
      } catch (error) {
        console.log('Error fetching users', error)
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='users-list-container'>
      <ul className='users-list'>
        {users.map(user => (
          <li key={user._id} className='user-item'>
            <UserImage user={user} width='30' />
            {user.username}
            <FollowButton
              userId={userFromContext._id}
              followUserId={user._id}
              onUpdate={() => followingChanged && followingChanged()}
              navigateAway={false}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UsersList
