import React from 'react'

export default function Button({
  title,
  onClick,
  type,
  icon,
  disabled,
  backgroundColor,
  color,
}) {
  return (
    <button
      style={{
        background: backgroundColor,
        color,
      }}
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`flex items-center justify-center font-bold p-2 rounded cursor-pointer`}
    >
      <span className="text-white text-2xl">{icon}</span>
      <span>{title}</span>
    </button>
  )
}
