import { useContext, useEffect, useState} from "react";
import { AuthContext } from "../context/Auth.context";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../config";
import UserCard from "../components/UserCard";

function Profile() {
  const { user: userFromContext } = useContext(AuthContext);
  const { userId: userIdPar } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(userFromContext);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('authToken');
      const userId = userIdPar ?? userFromContext._id;
      setIsLoading(true);

      try {
        const response = await axios.get(`${apiBaseUrl}/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const userData = response.data
        setUser(userData)
      } catch (error) {
        console.log('Error fetching users', error)
      }
      setIsLoading(false)
    }

    fetchUser()
  }, [])

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <div>Unable to fecth profile data.</div>;
  }

  const canEdit = (user._id === userFromContext._id);

  return (
    <div>
      <UserCard user={user} isEditable={canEdit} />
    </div>
  );
}

export default Profile;
