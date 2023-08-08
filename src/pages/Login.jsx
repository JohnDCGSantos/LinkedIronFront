import axios from 'axios'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/Auth.context'
import { apiBaseUrl } from "../config";

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null)
  //this is how we grab things from the context
  const { authenticateUser } = useContext(AuthContext)
  const nav = useNavigate()
  const handleLogin = async e => {
    e.preventDefault()
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${apiBaseUrl}/auth/login`, {
        email,
        password,
      })
      console.log('here is the Login response', data)
      localStorage.setItem('authToken', data.token)
      //Make sure you await the authenticate User as it takes time and you cant access the private route until its finished
      await authenticateUser()

      nav(`/profile/`)
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }

  if (isLoading){
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type='email'
            value={email}
            required
            onChange={event => {
              setEmail(event.target.value)
            }}
          />
        </label>
        <label>
          Password:
          <input
            type='password'
            value={password}
            required
            onChange={event => {
              setPassword(event.target.value)
            }}
          />
        </label>
        <button type='submit'>Login</button>
      </form>
      {errorMessage ? <p>{errorMessage}</p> : null}
    </div>
  )
}

export default Login