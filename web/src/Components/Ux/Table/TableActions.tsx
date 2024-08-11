import { Link } from 'react-router-dom'

export const TableActions = ({ id, icon, url, color, text }) => (
  <Link to={`/${url}/${id}`}>
    <div
      className={` flex gap-3 items-center justify-center text-2xl bg-${color}-600 hover:bg-${color}-500 text-${text} rounded p-3`}
    >
      {icon}
    </div>
  </Link>
)
