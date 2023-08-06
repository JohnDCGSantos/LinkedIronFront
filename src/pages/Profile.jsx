import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/Auth.context'
import { useParams } from 'react-router-dom'
import axios from 'axios'
function Profile() {
  const { isLoggedIn, logOutUser, isLoading } = useContext(AuthContext)
  const { userId } = useParams()
  const [user, setUser] = useState()

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:5005/api/profile/${userId}`)
      setUser(response.json())
    } catch (error) {
      console.error('error fetching user details')
    }
  }
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (!isLoggedIn) {
    return (
      <div>
        <p>Please log in to access your profile.</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Welcome back, {user}!</h2>
      {/* Render other profile details here */}
      <button onClick={() => logOutUser()}>Log Out</button>
    </div>
  )
}

export default Profile
