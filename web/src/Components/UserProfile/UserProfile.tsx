import { Link } from 'react-router-dom'
import UserAvatar from './UserAvatar'
import UserName from './UserName'

export default function UserProfile({ user }) {
  return (
    <div className="flex items-center justify-end gap-5 bg-white rounded-lg shadow-md p-4 mb-3">
      <UserName name={user.name} local={user.workLocation} />
      <Link to="/profile">
        <UserAvatar src={user.profileUrlImage} alt={user.name} />
      </Link>
    </div>
  )
}
