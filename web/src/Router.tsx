import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { AuthProvider, AuthContext } from './Components/Context/Auth'
import Alert from './Components/Ux/Alert/Alert'
import Home from './Page/Home/Home'
import Auth from './Page/Auth/Auth'
import Patients from './Page/Patients/Patients'
import DetailsPatients from './Page/Patients/DetailsPatients'
import EditPatient from './Components/CompoPatients/EditPatients'
import Request from './Page/Request/Request'
import DetailsRequest from './Page/Request/DetailsRequest'
import EditRequest from './Components/CompoRequest/EditRequest'
import User from './Page/User/User'
import { Specialties } from './Page/Specialties/Specialties'
import { MainLayout } from './Components/MainLayout/MainLayout'
import { DataProvider } from './Components/Context/DataContext'
import RegisterPatient from './Components/CompoPatients/RegisterPatient'
import CreateRequest from './Components/CompoRequest/CreateRequest'
import Profile from './Page/User/Profile'
import CompoLogin from './Components/CompoAuth/CompoLogin'
import CompoCreateAccount from './Components/CompoAuth/CompoCreateAccount'
import ForgetPassword from './Components/CompoAuth/ForgetPassword'
import ResetPassword from './Components/CompoAuth/ResetPassword'

function AdminPrivate({ children }: { children: JSX.Element }) {
  const { authenticated } = useContext(AuthContext)
  const location = useLocation()

  useEffect(() => {
    if (!authenticated) {
      Alert({ type: 'error', message: 'Você precisa estar logado' })
    } else {
      Alert({ type: 'success', message: 'Você está logado' })
    }
  }, [authenticated, location])

  if (!authenticated) {
    return <Navigate to="/auth" state={{ from: location }} />
  }

  return children
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/login" element={<CompoLogin />} />
          <Route path="/auth/create-account" element={<CompoCreateAccount />} />
          <Route path="/auth/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Rotas privadas */}
          <Route
            path="/*"
            element={
              <AdminPrivate>
                <DataProvider>
                  <MainLayout>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      {/* Rota para listagem de pacientes */}
                      <Route path="/patients" element={<Patients />} />
                      {/* Rota para adicionar pacientes */}
                      <Route
                        path="/patients/add-patient"
                        element={<RegisterPatient />}
                      />
                      {/* Rota para editar paciente */}
                      <Route
                        path="/edit-patient/:id"
                        element={<EditPatient />}
                      />
                      {/* Detalhes de paciente */}
                      <Route
                        path="/details-patient/:id"
                        element={<DetailsPatients />}
                      />
                      {/* Rota de solicitações */}
                      <Route path="/requests" element={<Request />} />
                      {/* Rota de adicionar solicitação	 */}
                      <Route
                        path="/request/add-request"
                        element={<CreateRequest />}
                      />
                      {/* Detalhes da solicitação */}
                      <Route
                        path="/details-request/:id"
                        element={<DetailsRequest />}
                      />
                      {/* Editar solicitação  */}
                      <Route
                        path="/edit-request/:id"
                        element={<EditRequest />}
                      />
                      {/* Especialidades */}
                      <Route path="/specialties" element={<Specialties />} />
                      {/* Usuários */}
                      <Route path="/users" element={<User />} />
                      {/* Perfil */}
                      <Route path="/profile" element={<Profile />} />
                    </Routes>
                  </MainLayout>
                </DataProvider>
              </AdminPrivate>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
