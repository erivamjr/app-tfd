import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Page/Home/Home'
import Auth from './Page/Auth/Auth'
import SideBar from './Components/SideBar/SideBar'
import Menu from './Components/Menu/Menu'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <div className='flex h-screen'>
        <SideBar />
        <div className=' w-full h-full flex flex-col p-16'>
          <Menu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
