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
      style={{ background: color, color: text }}
      className={` flex gap-3 items-center justify-center text-2xl rounded p-3 hover:opacity-80`}
    >
      {icon}
    </div>
  </Link>
)
