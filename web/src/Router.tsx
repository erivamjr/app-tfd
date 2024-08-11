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
        <div className="flex h-screen">
          <AdminPrivate>
            <SideBar />
          </AdminPrivate>
          <div className=" w-full h-full flex flex-col p-16">
            <AdminPrivate>
              <Menu />
            </AdminPrivate>
            <Routes>
              <Route path="/auth" element={<Auth />} />

              <Route path="/" element={<Home />} />

              <Route path="/pacientes" element={<Patients />} />
              <Route
                path="/detalhespaciente/:id"
                element={<DetailsPatients />}
              />
              <Route path="/solicitacao" element={<Request />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}
