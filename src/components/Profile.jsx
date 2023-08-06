import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Auth.context";
import axios from "axios";

function Profile() {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

//   const fetchProfileData = async () => {
//     try {
//         const tokenInStorage = localStorage.getItem('authToken');
//       const response = await axios.get("http://localhost:5005/users/profile", {
//         headers: {
//           Authorization: `Bearer ${tokenInStorage}`,
//         },
//       });
//       setProfileData(response.data.profile);
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error fecthing profile data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProfileData();
//   }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <div>Unable to fecth profile data.</div>;
  }

  return (
    <div>
      <h2>Welcome back, {user.username}!</h2>
      <h3>Profile Information</h3>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default Profile;
