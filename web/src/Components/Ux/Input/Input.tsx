import React from 'react'

interface InputProps {
  type: string
  name: string
  value: string | number | readonly string[] | undefined
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  list?: string
  placeholder?: string
  required?: boolean
  autocomplete?: string
  disabled?: boolean
}

export default function Input({
  type,
  name,
  value,
  onChange,
  list,
  placeholder,
  required,
  autocomplete,
  disabled,
}: InputProps) {
  return (
    <input
      placeholder={placeholder}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      list={list}
      className={
        disabled
          ? 'cursor-not-allowed w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-500'
          : 'w-full border border-gray-300 rounded-md p-2'
      }
      required={required}
      autoComplete={autocomplete}
      disabled={disabled}
    />
  )
}
