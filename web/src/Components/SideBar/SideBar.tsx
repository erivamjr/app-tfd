import { IoMenu } from 'react-icons/io5'
import { CiHome, CiLogout, CiMedicalCase } from 'react-icons/ci'
import { IoIosClose } from 'react-icons/io'
import Logo from '../Ux/Logo/Vector.png'

import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { GoPeople } from 'react-icons/go'
import { TbReportSearch } from 'react-icons/tb'
import { RiCalendarScheduleLine } from 'react-icons/ri'
import { GiBrain } from 'react-icons/gi'
import { AuthContext } from '../Context/Auth'

export default function SideBar() {
  const { logout } = useContext(AuthContext)
  const [sideBar, setSideBar] = useState(false)
  const [page, setPage] = useState('Home')

  function handleSideBar() {
    setSideBar(!sideBar)
  }

  return (
    <div
      className={` ${sideBar ? 'w-16' : 'w-60'} h-screen flex flex-col bg-blue-600 text-white transition-width duration-300`}
    >
      <div
        onClick={handleSideBar}
        className={`flex justify-end text-3xl cursor-pointer p-3 bg-blue-600`}
      >
        {sideBar ? <IoMenu /> : <IoIosClose />}
      </div>
      {!sideBar && (
        <div className="flex justify-end items-center bg-blue-600">
          <img className="w-36 h-36" src={Logo} alt="Logo" />
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
            to="/especialidades"
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

function MenuItem({ to, icon, label, currentPage, setPage, sideBar, onClick }) {
  const isActive = currentPage === label

  const handleClick = () => {
    if (onClick) onClick() // Executa o onClick se ele for passado
    setPage(label) // Define a página atual
  }

  return (
    <li
      onClick={handleClick}
      className={`flex gap-1 items-center p-2 cursor-pointer ${isActive ? 'w-full bg-white rounded text-[#006A85]' : 'hover:text-blue-300'} ${sideBar ? 'justify-center' : ''}`}
    >
      <span>{icon}</span>
      {!sideBar && (
        <Link to={to}>
          <span>{label}</span>
        </Link>
      )}
    </li>
  )
}
