import UserAvatar from './UserAvatar'
import UserName from './UserName'

export default function UserProfile({ user }) {
  return (
    <div className="flex items-center justify-end gap-5  mb-3">
      <UserName name={user.name} />
      <UserAvatar src={user.profileUrlImage} alt={user.name} />
    </div>
  )
}
