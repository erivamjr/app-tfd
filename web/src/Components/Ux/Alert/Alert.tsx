import './style.css'

export default function Alert({ type, message }) {
  // Define as classes de acordo com o tipo de alerta
  const alertClasses = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-black',
    info: 'bg-blue-500 text-white',
  }

  // Seleciona a classe baseada no tipo
  const alertClass = alertClasses[type] || 'bg-gray-500 text-white' // Classe padrão se o tipo for inválido

  return (
    <div
      className={` z-50 animate ${alertClass} absolute top-32 right-10 p-2 rounded-lg shadow-lg`}
    >
      {message}
    </div>
  )
}
