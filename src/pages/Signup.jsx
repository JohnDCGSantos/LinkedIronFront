import axios from "axios"
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Signup(){
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState('')
    const [bootcamp, setBootcamp] = useState('')
    const [graduationDate, setGraduationDate] = useState('')
    const nav = useNavigate();

   const handleSignup = async (e)=>{
e.preventDefault();
try{
const res = await axios.post('http://localhost:5173/signup',)
    setUsername(''),
    setEmail (''),
    setPassword(''),
    setImage(''),
    setBootcamp(''),
    setGraduationDate(''),
    nav('/Login')

console.log("here is the signup response", res);

}
catch(error){
    console.error(error)
}
    }

    const formStyle = {
        display: "flex",
        flexDirection: "column",
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      };
    
      const inputStyle = {
        padding: "5px",
        borderRadius: "3px",
        border: "1px solid #ccc",
      };
    
      const buttonStyle = {
        padding: "10px 20px",
        borderRadius: "5px",
        background: "#007bff",
        color: "#fff",
        border: "none",
        cursor: "pointer",
      };

    return (
        <div>
        <h1>Sign Up here!</h1>
        <form onSubmit={handleSignup} style={formStyle}>
        
          <input
          style={inputStyle}
            type="text"
            value={username}
            required
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            placeholder='Username'
          />
        
        
          <input
          style={inputStyle}
            type="email"
            value={email}
            required
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            placeholder='Email' />
        
        
          <input
          style={inputStyle}
            type="password"
            value={password}
            required
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            placeholder='Passord' />
        
        
          <input
          style={inputStyle}
            type="text"
            value={image}
            required
            onChange={(event) => {
              setImage(event.target.value);
            }}
            placeholder='Image'/>
       
        
          <input
          style={inputStyle}
            type="text"
            value={bootcamp}
            required
            onChange={(event) => {
              setBootcamp(event.target.value);
            }}
           placeholder='Bootcamp'/>
       
          <input
          style={inputStyle}
            type="date"
            value={graduationDate}
            required
            onChange={(event) => {
              setGraduationDate(event.target.value);
            }}
            placeholder='Graduation Date' />
        <button style={buttonStyle} type="submit">Signup</button>
      </form>
        </div>
    )
}

export default Signup;