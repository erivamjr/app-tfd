import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Page/Home/Home'
import Auth from './Page/Auth/Auth'
import SideBar from './Components/SideBar/SideBar'
import Menu from './Components/Menu/Menu'
import Patients from './Page/Patients/Patients'
import DetailsPatients from './Page/Patients/DetailsPatients'
import Request from './Page/Request/Request'
import { AuthContext, AuthProvider } from './Components/Context/Auth'
import { useContext } from 'react'
import User from './Page/User/User'
import DetailsRequest from './Page/Request/DetailsRequest'
import EditPatient from './Components/CompoPatients/EditPatients'

export default function AppRouter() {
  const AdminPrivate = ({ children }) => {
    const { authenticated } = useContext(AuthContext)
    if (!authenticated) {
      return <Navigate to="/auth" />
    }
    return children
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className=" flex justify-center items-center h-screen">
          <Routes>
            <Route path="/auth" element={<Auth />} />

            <Route
              path="/*"
              element={
                <AdminPrivate>
                  <div className="flex w-full h-full">
                    <SideBar />
                    <div className="w-full h-full flex flex-col p-8">
                      <Menu />
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

                        <Route path="/solicitacao" element={<Request />} />
                        <Route
                          path="/detalhessolicitacao/:id"
                          element={<DetailsRequest />}
                        />
                        <Route path="/usuarios" element={<User />} />
                      </Routes>
                    </div>
                  </div>
                </AdminPrivate>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}
