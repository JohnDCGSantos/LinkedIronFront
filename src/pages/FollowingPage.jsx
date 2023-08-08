import FollowingList from '../components/FollowingList'
import FollowerList from '../components/FollowersList'
const FollowingPage = () => {
  return (
    <div>
      <h1>Following </h1>
      <FollowingList />
      <h1>Followers </h1>
      <FollowerList />
    </div>
  )
}

export default FollowingPage
