import './style.css'
export default function Alert({ color, message, text }) {
  return (
    <div
      className={`animate bg-${color}-600 text-${text} absolute top-32 right-10  p-2 rounded-lg shadow-lg`}
    >
      {message}
    </div>
  )
}
