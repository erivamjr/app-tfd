import { useContext } from 'react'
import CompoProfile from '../../Components/CompoUser/CompoProfile'
import { AuthContext } from '../../Components/Context/Auth'

export default function Profile() {
  const { user } = useContext(AuthContext)

  return (
    user && (
      <CompoProfile
        name={user.name}
        email={user.email}
        phone={user.phone}
        cpf={user.cpf}
        role={user.role}
        workLocation={user.workLocation}
        profileUrlImage={user.profileUrlImage}
      />
    )
  )
}
