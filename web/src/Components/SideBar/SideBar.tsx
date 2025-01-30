import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoMenu } from 'react-icons/io5'
import { CiHome, CiLogout, CiMedicalCase } from 'react-icons/ci'
import { IoIosClose } from 'react-icons/io'
import { GoPeople } from 'react-icons/go'
import { RiCalendarScheduleLine } from 'react-icons/ri'
import { AuthContext } from '../Context/Auth'
import Logo from '../Ux/Logo/Vector.png'
import { CgProfile } from 'react-icons/cg'
import { MenuItem } from './MenuItem'

export default function SideBar() {
  const { logout } = useContext(AuthContext)
  const [sideBar, setSideBar] = useState(false)
  const [page, setPage] = useState('Home')
  const navigate = useNavigate()

  function handleSideBar() {
    setSideBar(!sideBar)
  }

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setSideBar(true)
    } else {
      setSideBar(false)
    }
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="flex">
      <div
        className={`${sideBar ? 'w-16' : 'w-60'} flex-shrink-0 bg-blue-600 text-white transition-all duration-300`}
      >
        <div
          onClick={handleSideBar}
          className="flex justify-end text-3xl cursor-pointer p-3 bg-blue-600"
        >
          {sideBar ? <IoMenu /> : <IoIosClose />}
        </div>
        {!sideBar && (
          <div className="flex justify-end items-center bg-blue-600">
            <img className="w-36 h-36 rounded-l-lg" src={Logo} alt="Logo" />
          </div>
        )}
        <div
          className={`flex flex-col justify-between p-3 ${sideBar ? 'items-center' : 'items-start'}`}
        >
          <ul className="mt-20 w-full">
            <MenuItem
              to="/"
              icon={<CiHome />}
              label="Home"
              currentPage={page}
              setPage={setPage}
              sideBar={sideBar}
              navigate={navigate}
            />
            <MenuItem
              to="/patients"
              icon={<CgProfile />}
              label="Pacientes"
              currentPage={page}
              setPage={setPage}
              sideBar={sideBar}
              navigate={navigate}
            />
            <MenuItem
              to="/requests"
              icon={<RiCalendarScheduleLine />}
              label="Solicitação"
              currentPage={page}
              setPage={setPage}
              sideBar={sideBar}
              navigate={navigate}
            />
            <MenuItem
              to="/specialties"
              icon={<CiMedicalCase />}
              label="Especialidades"
              currentPage={page}
              setPage={setPage}
              sideBar={sideBar}
              navigate={navigate}
            />
            <MenuItem
              to="/users"
              icon={<GoPeople />}
              label="Usuários"
              currentPage={page}
              setPage={setPage}
              sideBar={sideBar}
              navigate={navigate}
            />
            <MenuItem
              to="/users"
              icon={<CiLogout />}
              label="Sair"
              currentPage={page}
              setPage={setPage}
              sideBar={sideBar}
              onClick={logout}
              navigate={navigate}
            />
          </ul>
        </div>
      </div>
    </div>
  )
}
