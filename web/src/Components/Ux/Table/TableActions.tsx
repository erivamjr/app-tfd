import { Link } from 'react-router-dom'

interface TableActionsProps {
  id: string
  icon: React.ReactNode
  url: string
  color: string
  text: string
}

export const TableActions = ({
  id,
  icon,
  url,
  color,
  text,
}: TableActionsProps) => (
  <Link to={`/${url}/${id}`}>
    <div
      style={{ color: text }}
      className={` flex gap-3 ${color} items-center justify-center text-2xl rounded p-3`}
    >
      {icon}
    </div>
  </Link>
)
