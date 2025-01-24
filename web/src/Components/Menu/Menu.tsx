import { useContext } from 'react'
import { AuthContext } from '../Context/Auth'
import UserProfile from '../UserProfile/UserProfile'

export default function Menu() {
  const { user } = useContext(AuthContext)
  // console.log('CONSOLANDO USER DO CONTEXT', user)

  return (
    <div className="px-2 md:px-4">
      <UserProfile user={user} />
      <hr className="shadow-lg bg-gray-200 h-1" />
    </div>
  )
}
