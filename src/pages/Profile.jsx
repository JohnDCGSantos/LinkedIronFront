import { useContext } from 'react'
import { AuthContext } from '../context/Auth.context'


function Profile() {
   
  const { isLoggedIn, user, logOutUser, isLoading } = useContext(AuthContext)
 
  
 

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
      <h2>Welcome back, {}!</h2>
      {/* Render other profile details here */}
      

    <button onClick={() => logOutUser()}>Log Out</button>
    </div>
  )
}

export default Profile
