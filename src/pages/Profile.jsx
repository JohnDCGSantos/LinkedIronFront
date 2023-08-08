import { useContext} from "react";
import UserCard from "../components/UserCard";
import { AuthContext } from "../context/Auth.context";

function Profile() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Unable to fecth profile data.</div>;
  }

  return (
    <div>
      <UserCard user={user} />
    </div>
  );
}

export default Profile;
