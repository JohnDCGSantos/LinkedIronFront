import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import FollowButton from '../components/FollowButton'
import { AuthContext } from '../context/Auth.context'

function UsersList() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const authContext = useContext(AuthContext) // Use the AuthContext directly

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('authToken')
      try {
        const response = await axios.get('http://localhost:5005/api/users', {
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
  const filteredUsers = users.filter(user => user._id !== authContext.user._id)

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {filteredUsers.map(user => (
          <li key={user._id}>
            {user.username}
            <FollowButton
              userId={authContext.user._id} // Use the user's ID from the context
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

/*import { useEffect, useState } from 'react'
import axios from 'axios'
import FollowButton from '../components/FollowButton'

function UsersList() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('authToken')
      try {
        const response = await axios.get('http://localhost:5005/api/users', {
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

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.username}
            <FollowButton
              userId={user._id} // Replace this with the ID of the currently logged-in user
              onFollow={() => {
                console.log(`Followed user ${user._id}`)
              }}
              onUnfollow={() => {
                console.log(`Unfollowed user ${user._id}`)
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UsersList*/
