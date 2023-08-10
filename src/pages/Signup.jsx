import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../config";
import CloudinaryUpload from "../components/CloudinaryUpload";
import '../App.css'
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [bootcamp, setBootcamp] = useState("");
  const [graduationDate, setGraduationDate] = useState("");
  const nav = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${apiBaseUrl}/auth/signup`,

        { username, email, password, image, bootcamp, graduationDate }
      );
      {
        setUsername("");
        setEmail("");
        setPassword("");
        setImage("");
        setBootcamp("");
        setGraduationDate("");
      }

      console.log("here is the signup response", res.data);
      nav("/Login");
    } catch (error) {
      console.error(error);
    }
  };
  const backgroundImageUrl = "url('../images/firstImageHome.png')";

  
  const titleStyle = {
    position: "absolute",
    fontSize: "60px",
      fontWeight: "bold",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
      textAlign: "center", // Center the title
     
      color: 'white',
  }
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
  const formContainerStyle = {
    
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  
    /* opacity: 0.5, // You can adjust the opacity as needed
    zIndex: -1, */ // Place the background behind other content
  };
  
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: "400px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "7px",
    backgroundColor: 'white',
    opacity: '0.95',
marginTop: '100px',

  };

  const inputStyle = {
    width: '300px',
    padding: "5px",
    margin: '1px',
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
    width: '100px',
  };
  


  const updatePhoto = (updatedMedia) => {
    setImage(updatedMedia[0]);
  };

  return (
    <div >
    
      <div style={backgroundContainerStyle}></div>
      <div style={formContainerStyle}>
      <h1 style={titleStyle}>Sign Up here!</h1>
      <form onSubmit={handleSignup} style={formStyle}>
        <input
          style={inputStyle}
          type="text"
          value={username}
          required
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          placeholder="Username"
        />
        <input
          style={inputStyle}
          type="email"
          value={email}
          required
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          placeholder="Email"
        />
        <input
          style={inputStyle}
          type="password"
          value={password}
          required
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="Password"
        />
        <input
          style={inputStyle}
          type="text"
          value={bootcamp}
          required
          onChange={(event) => {
            setBootcamp(event.target.value);
          }}
          placeholder="Bootcamp"
        />
        <input
          style={inputStyle}
          type="date"
          value={graduationDate}
          required
          onChange={(event) => {
            setGraduationDate(event.target.value);
          }}
          placeholder="Graduation Date"
        />
        <CloudinaryUpload allowMultiple={false} initialMedia={[]} onMediaUpdated={updatePhoto} />

        <button style={buttonStyle} type="submit">
          Signup
        </button>
      </form>
      </div>
    </div>
    
  );
};

export default Signup;
