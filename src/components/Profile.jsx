import { useContext} from "react";
import UserCard from "./UserCard";
import { AuthContext } from "../context/Auth.context";
import PostItem from '../components/PostItem'

function Profile() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Unable to fecth profile data.</div>;
  }

  return (
    <div>
      <UserCard user={user} />
      <PostItem user={user}/>
    </div>
  );
}

export default Profile;
