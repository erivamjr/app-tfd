import React from 'react'

export default function Button({ title, onClick, type, icon, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={` w-full flex items-center justify-center gap-2 bg-[#D6004B] text-white font-bold py-2 px-4 rounded mt-4 cursor-pointer`}
    >
      <span className="text-white text-2xl">{icon}</span>
      <span>{title}</span>
    </button>
  )
}
