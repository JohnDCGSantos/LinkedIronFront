import { useFollowToggle } from './UseFollowToogle'

const FollowButton = ({ userId, followUserId, onUpdate }) => {
  const { isFollowing, isLoading, toggleFollow } = useFollowToggle(userId, followUserId)

  const handleToggle = async () => {
    try {
      await toggleFollow()
      if (onUpdate) {
        onUpdate() // Call the onUpdate function provided by parent component
      }
    } catch (error) {
      console.error('Error toggling follow:', error)
    }
  }

  return (
    <button onClick={handleToggle} disabled={isLoading}>
      {isLoading ? 'Loading...' : isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  )
}

export default FollowButton
