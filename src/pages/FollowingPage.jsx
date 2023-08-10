import FollowingList from '../components/FollowingList'
import FollowerList from '../components/FollowersList'
import '../FollowingPage.css' // Import the custom styles

const FollowingPage = () => {
  return (
    <div className='containerF'>
      <div className='containerFollowing'>
        <h1 className='section-heading'>Following</h1>
        <div>
          <FollowingList />
        </div>
      </div>

      <div className='containerFollowers'>
        <h1 className='section-heading '>Followers</h1>
        <div>
          <FollowerList />
        </div>
      </div>
    </div>
  )
}

export default FollowingPage
