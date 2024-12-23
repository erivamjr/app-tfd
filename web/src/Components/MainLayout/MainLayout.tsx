import Menu from '../Menu/Menu'
import SideBar from '../SideBar/SideBar'

export function MainLayout({ children }: { children: JSX.Element }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        <SideBar />
        <div className="flex flex-col flex-grow p-2 md:p-4">
          <Menu />
          <div className="flex-grow overflow-auto">{children}</div>
        </div>
      </div>
      <footer className="text-center text-[#B0BEC5] bg-blue-600 w-full py-4">
        FOOTER
      </footer>
    </div>
  )
}
