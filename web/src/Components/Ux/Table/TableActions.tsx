import { Link } from 'react-router-dom'

interface TableActionsProps {
  id: string
  icon: React.ReactNode
  url: string
  color: string
  text?: string
}

export const TableActions = ({ id, icon, url, color }: TableActionsProps) => {
  return (
    <Link
      to={`/${url}/${id}`}
      className={`rounded-md transition-all duration-200  hover:scale-105 ${color} flex items-center justify-center p-2 min-w-[50px]`}
    >
      <span className="text-xl ">{icon}</span>
    </Link>
  )
}
