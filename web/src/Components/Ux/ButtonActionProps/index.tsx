interface ButtonActionProps {
  icon: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
  color: string
}

export const ButtonAction = ({ icon, onClick, color }: ButtonActionProps) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-md transition-all duration-200 hover:scale-105 ${color} flex items-center justify-center p-2 min-w-[50px]`}
    >
      <span className="text-xl text-red-800">{icon}</span>
    </button>
  )
}
