import UserProfile from '../UserProfile/UserProfile'
import imgProfile from './perfil.png'

export default function Menu() {
  const user = {
    name: 'Taynara Camara Pacheco',
    avatar: imgProfile,
  }
  return (
    <div>
      <UserProfile user={user} />
      <hr className="border-0 bg-gray-200 h-1" />
    </div>
  )
}
