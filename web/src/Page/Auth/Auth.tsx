import { useLocation } from 'react-router-dom'
import CompoCreateAccount from '../../Components/CompoAuth/CompoCreateAccount'
import CompoLogin from '../../Components/CompoAuth/CompoLogin'

export default function Auth() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const mode = queryParams.get('mode') || 'login'
  console.log('mode')
  return (
    <div className="w-screen">
      {mode === 'login' ? <CompoLogin /> : <CompoCreateAccount />}
    </div>
  )
}
