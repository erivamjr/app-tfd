import React from 'react'

interface ButtonProps {
  title: string
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset'
  icon?: React.ReactNode
  disabled?: boolean
  backgroundColor?: string
  color?: string
}

export default function Button({
  title,
  onClick,
  type = 'button',
  icon,
  disabled = false,
  backgroundColor = 'transparent',
  color = 'black',
}: ButtonProps) {
  return (
    <button
      style={{
        background: backgroundColor,
        color,
      }}
      disabled={disabled}
      onClick={onClick}
      type={type}
      className="flex items-center justify-center font-bold p-2 rounded cursor-pointer"
    >
      {icon && <span className="text-white text-2xl">{icon}</span>}
      <span>{title}</span>
    </button>
  )
}
