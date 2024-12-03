import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoMenu } from 'react-icons/io5'
import { CiHome, CiLogout, CiMedicalCase } from 'react-icons/ci'
import { IoIosClose } from 'react-icons/io'
import { GoPeople } from 'react-icons/go'
import { TbReportSearch } from 'react-icons/tb'
import { RiCalendarScheduleLine } from 'react-icons/ri'
import { GiBrain } from 'react-icons/gi'
import { AuthContext } from '../Context/Auth'
import Logo from '../Ux/Logo/Vector.png'

interface MenuItemProps {
  to: string
  icon: React.ReactNode
  label: string
  currentPage: string
  setPage: (page: string) => void
  sideBar: boolean
  onClick?: () => void
}

export default function SideBar() {
  const { logout } = useContext(AuthContext)
  const [sideBar, setSideBar] = useState(false)
  const [page, setPage] = useState('Home')

  function handleSideBar() {
    setSideBar(!sideBar)
  }

  return (
    <div
      className={`${
        sideBar ? 'w-16' : 'w-60'
      }  flex flex-col bg-blue-600 text-white transition-width duration-300`}
    >
      <div
        onClick={handleSideBar}
        className="flex justify-end text-3xl cursor-pointer p-3 bg-blue-600"
      >
        {sideBar ? <IoMenu /> : <IoIosClose />}
      </div>
      {!sideBar && (
        <div className="flex justify-end items-center bg-blue-600">
          <img className="w-36 h-36" src={Logo} alt="Logo" />
        </div>
      )}
      <div
        className={`flex flex-col justify-between p-3 ${
          sideBar ? 'items-center' : 'items-start'
        }`}
      >
        <ul className="mt-20 w-full">
          <MenuItem
            to="/"
            icon={<CiHome />}
            label="Home"
            currentPage={page}
            setPage={setPage}
            sideBar={sideBar}
          />
          <MenuItem
            to="/pacientes"
            icon={<GiBrain />}
            label="Pacientes"
            currentPage={page}
            setPage={setPage}
            sideBar={sideBar}
          />
          <MenuItem
            to="/solicitacao"
            icon={<RiCalendarScheduleLine />}
            label="Solicitação"
            currentPage={page}
            setPage={setPage}
            sideBar={sideBar}
          />
          <MenuItem
            to="/relatorios"
            icon={<TbReportSearch />}
            label="Relatórios"
            currentPage={page}
            setPage={setPage}
            sideBar={sideBar}
          />
          <MenuItem
            to="/specialties"
            icon={<CiMedicalCase />}
            label="Especialidades"
            currentPage={page}
            setPage={setPage}
            sideBar={sideBar}
          />
          <MenuItem
            to="/usuarios"
            icon={<GoPeople />}
            label="Usuários"
            currentPage={page}
            setPage={setPage}
            sideBar={sideBar}
          />
          <MenuItem
            to="/usuarios"
            icon={<CiLogout />}
            label="Sair"
            currentPage={page}
            setPage={setPage}
            sideBar={sideBar}
            onClick={logout}
          />
        </ul>
      </div>
    </div>
  )
}

function MenuItem({
  to,
  icon,
  label,
  currentPage,
  setPage,
  sideBar,
  onClick,
}: MenuItemProps) {
  const isActive = currentPage === label

  const handleClick = () => {
    if (onClick) onClick() // Executes onClick if provided
    setPage(label) // Sets the current page
  }

  return (
    <li
      onClick={handleClick}
      className={`flex gap-1 items-center p-2 cursor-pointer ${
        isActive
          ? 'w-full bg-white rounded text-blue-600'
          : 'hover:text-blue-200'
      } ${sideBar ? 'justify-center' : ''}`}
    >
      <Link
        to={to}
        className={`flex items-center gap-1 ${sideBar ? 'justify-center' : ''}`}
      >
        <span>{icon}</span>
        {!sideBar && <span>{label}</span>}
      </Link>
    </li>
  )
}
