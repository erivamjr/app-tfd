import { Footer } from '../Footer'
import Menu from '../Menu/Menu'
import SideBar from '../SideBar/SideBar'

export function MainLayout({ children }: { children: JSX.Element }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        <SideBar />
        <div className="flex flex-col flex-grow p-2 md:p-4 bg-gray-50">
          <Menu />
          <div className="flex-grow overflow-auto">{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
