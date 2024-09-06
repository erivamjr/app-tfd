import './style.css'

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
}

export default function Alert({ type, message }: AlertProps) {
  const alertClasses: Record<AlertProps['type'], string> = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-black',
    info: 'bg-blue-500 text-white',
  }
  const alertClass = alertClasses[type] || 'bg-gray-500 text-white'

  return (
    <div
      className={`z-50 animate ${alertClass} absolute top-32 right-10 p-2 rounded-lg shadow-lg`}
    >
      {message}
    </div>
  )
}
