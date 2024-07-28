import { IoMenu } from 'react-icons/io5'
import { CiHome } from 'react-icons/ci'
import { AiOutlineProduct } from 'react-icons/ai'
import { CgClipboard } from 'react-icons/cg'
import { IoIosClose } from 'react-icons/io'
import Logo from '../Ux/Logo/Vector.png'

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
export default function SideBar() {
  const [sideBar, setSideBar] = useState(false)
  function handleSideBar() {
    if (sideBar) {
      setSideBar(false)
    } else {
      setSideBar(true)
    }
  }
  return (
    <div className={` ${sideBar ? '' : 'sm:w-60'} `}>
      <div
        onClick={handleSideBar}
        className={` ${sideBar ? 'h-screen' : ''
          } flex justify-end text-3xl cursor-pointer text-white p-3 bg-[#008BAD]`}
      >
        {sideBar ? <IoMenu /> : <IoIosClose />}
      </div>
      {!sideBar ? <div className='flex justify-end items-end bg-[#008BAD]'>
        <img className='bg-[#008BAD]' src={Logo} />
      </div> : <></>}

      <div
        className={` ${sideBar != false && 'hidden'
          } h-screen flex flex-col justify-between p-3 bg-[#008BAD] text-white`}
      >
        <ul className='mt-20'>
          <li className=" flex gap-1 items-center p-2 cursor-pointer hover:text-slate-900 hover:border-b">
            <span>
              <CiHome />
            </span>
            <Link to={'/'}>
              <span>Home</span>
            </Link>
          </li>
          <li className="flex gap-1 items-center p-2 cursor-pointer hover:text-slate-900 hover:border-b">
            <span>
              <AiOutlineProduct />
            </span>
            <Link to={'/pacientes'}>
              <span>Pacientes</span>
            </Link>
          </li>
          <li className="flex gap-1 items-center p-2 cursor-pointer hover:text-slate-900 hover:border-b">
            <span>
              <AiOutlineProduct />
            </span>
            <Link to={'/solicitacao'}>
              <span>Solicitação</span>
            </Link>
          </li>
          <Link to={'/relatorios'}>
            <li className="flex gap-1 items-center p-2 cursor-pointer hover:text-slate-900 hover:border-b">
              <span>
                <AiOutlineProduct />
              </span>
              <span>Relatórios</span>
            </li>
          </Link>
          <Link to={'/especialidades'}>
            <li className="flex gap-1 items-center p-2 cursor-pointer hover:text-slate-900 hover:border-b">
              <span>
                <CgClipboard />
              </span>
              <span>Especialidades</span>
            </li>
          </Link>
          <Link to={'/usuarios'}>
            <li className="flex gap-1 items-center p-2 cursor-pointer hover:text-slate-900 hover:border-b">
              <span>
                <CgClipboard />
              </span>
              <span>Usuários</span>
            </li>
          </Link>

        </ul>
      </div>
    </div>
  )
}
