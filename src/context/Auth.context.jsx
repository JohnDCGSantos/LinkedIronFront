import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { apiBaseUrl } from "../config";

const AuthContext = createContext()

const AuthContextWrapper = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const authenticateUser = async () => {
    const tokenInStorage = localStorage.getItem('authToken')
    if (tokenInStorage) {
      try {
        const { data } = await axios.get(`${apiBaseUrl}/auth/verify`, {
          headers: { authorization: `Bearer ${tokenInStorage}` },
        })
        console.log('from the context, here is the verify response', data)
        const user = data
        setUser(user)
        setIsLoading(false)
        setIsLoggedIn(true)
      } catch (err) {
        console.log('error on the authenticate user function', err)
        setUser(null)
        setIsLoading(false)
        setIsLoggedIn(false)
      }
    } else {
      setUser(null)
      setIsLoading(false)
      setIsLoggedIn(false)
    }
  }
  const removeToken = () => {
    localStorage.removeItem('authToken')
  }

  const logOutUser = () => {
    removeToken()
    updateUser(null)
    setIsLoggedIn(false)
  }

  const updateUser = newUserData => {
    setUser(newUserData)
  }

  useEffect(() => {
    authenticateUser()
  }, [])
  console.log('Context Data:', { user, isLoading, isLoggedIn })

  console.log('AuthProvider user:', user)
  return (
    <AuthContext.Provider
      value={{
        authenticateUser,
        user,
        isLoading,
        isLoggedIn,
        logOutUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export { AuthContext, AuthContextWrapper }
