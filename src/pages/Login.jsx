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



  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "5px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    width: '100px',
    alignItems: 'center',
    

  };

  const backgroundImageUrl = "url('../images/firstImageHome.png')";
  const titleStyleLogin = {
    fontSize: "60px",
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
    textAlign: "center", // Center the title
    marginTop: '100px',
    color: 'white',
    padding: '30px',
  };
  
  const backgroundContainerStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: backgroundImageUrl,
    backgroundSize: "cover",
    backgroundPosition: "center",
    overflow: 'hidden',

    /* opacity: 0.5, // You can adjust the opacity as needed
    zIndex: -1, */ // Place the background behind other content
  };
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: 'center',
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "7px",
    backgroundColor: 'white',
    opacity: '0.95',
  };

  const inputStyle = {
    padding: "5px",
    width: '250px',
    borderRadius: "3px",
    border: "1px solid #ccc",
    margin: "5px 0", // Add margin to the input boxes
    alignSelf: "stretch",
  };

  const labelStyle = {
    display: 'flex',
    flexDirection: 'column',
   alignItems: 'center',
   color: 'grey',
  }

  return (
    <div>
       <div style={backgroundContainerStyle}></div>
       <div style={backgroundContainerStyle}>
      <h2 style={titleStyleLogin}>Login Page</h2>
      <form onSubmit={handleLogin} style={formStyle}>
        <label style={labelStyle}>
          Email:
          <input
          style={inputStyle}
            type='email'
            value={email}
            required
            onChange={event => {
              setEmail(event.target.value)
            }}
          />
        </label>
        <label style={labelStyle} >
          Password:
          <input
          style={inputStyle}
            type='password'
            value={password}
            required
            onChange={event => {
              setPassword(event.target.value)
            }}
          />
        </label>
        <button style={buttonStyle} type='submit'>Login</button>
      </form>
      {errorMessage ? <p>{errorMessage}</p> : null}
      </div>
    </div>
  )
}

export default Login