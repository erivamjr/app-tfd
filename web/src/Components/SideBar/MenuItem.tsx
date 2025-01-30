interface MenuItemProps {
  to: string
  icon: React.ReactNode
  label: string
  currentPage: string
  setPage: (page: string) => void
  sideBar: boolean
  onClick?: () => void
  navigate: (path: string) => void
}

export function MenuItem({
  to,
  icon,
  label,
  currentPage,
  setPage,
  sideBar,
  onClick,
  navigate,
}: MenuItemProps) {
  const isActive = currentPage === label

  const handleClick = () => {
    if (onClick) onClick()
    setPage(label)
    navigate(to)
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
      <span>{icon}</span>
      {!sideBar && <span>{label}</span>}
    </li>
  )
}
