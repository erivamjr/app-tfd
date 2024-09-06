import React from 'react'

interface InputProps {
  type: string
  name: string
  value: string | number | readonly string[] | undefined
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  list?: string
  placeholder?: string
}

export default function Input({
  type,
  name,
  value,
  onChange,
  list,
  placeholder,
}: InputProps) {
  return (
    <input
      placeholder={placeholder}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      list={list}
      className="mt-1 block w-full rounded-md p-2 border"
      required
    />
  )
}
