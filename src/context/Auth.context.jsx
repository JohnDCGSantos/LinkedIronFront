import { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthContextWrapper = (props) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const storeToken = (token) => {
    localStorage.setItem('authToken', token);
  }  

  const authenticateUser = async () => {
    const tokenInStorage = localStorage.getItem("authToken");
    console.log("here is the token from the local storage", tokenInStorage);
    
    if (tokenInStorage) {
      try {
        //we make a call to the server and check if the token is valid
        const { data } = await axios.get("http://localhost:5005/auth/verify", {
          headers: { authorization: `Bearer ${tokenInStorage}` },
        });
        console.log("from the context, here is the verify response", data);
        setUser(data.currentUser);
        setIsLoading(false);
        setIsLoggedIn(true);
      } catch (err) {
        console.log("error on the authenticate user function", err);
        setUser(null);
        setIsLoading(false);
        setIsLoggedIn(false);
      }
    } else {
      //we will set the user back null, set isLoading to false, set isLoggedIn to false
      setUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        test: "here is a test",
        authenticateUser,
        user,
        storeToken,
        isLoading,
        isLoggedIn,
      }}
    >
      {props.children} 
    </AuthContext.Provider>
  );
};


export { AuthContext, AuthContextWrapper };
