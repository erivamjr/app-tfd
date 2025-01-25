interface CardProps {
  title: string
  icon: React.ReactNode
  number: number
  color: 'teal' | 'blue' | 'red' | 'green' | 'yellow' | 'gray' | 'purple'
}

export const Card = ({ title, icon, number, color }: CardProps) => {
  return (
    <div
      className={`bg-${color}-100 text-gray-700 p-6 rounded-lg shadow-md  max-w-xs`}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className={`bg-${color}-500 rounded-full p-3 text-white`}>
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold">{number}</p>
    </div>
  )
}
