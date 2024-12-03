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

          {/* Rotas privadas */}
          <Route
            path="/*"
            element={
              <AdminPrivate>
                <DataProvider>
                  <MainLayout>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/pacientes" element={<Patients />} />
                      <Route
                        path="/detalhespaciente/:id"
                        element={<DetailsPatients />}
                      />
                      <Route
                        path="/edit-patient/:id"
                        element={<EditPatient />}
                      />
                      <Route
                        path="/edit-request/:id"
                        element={<EditRequest />}
                      />
                      <Route path="/solicitacao" element={<Request />} />
                      <Route path="/specialties" element={<Specialties />} />
                      <Route
                        path="/detalhessolicitacao/:id"
                        element={<DetailsRequest />}
                      />
                      <Route path="/usuarios" element={<User />} />
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
