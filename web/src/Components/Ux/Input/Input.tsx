import React, { forwardRef } from 'react'

interface InputProps {
  type: string
  name: string
  value?: string | number | readonly string[] | undefined
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  list?: string
  placeholder?: string
  required?: boolean
  autocomplete?: string
  disabled?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      name,
      value,
      onChange,
      list,
      placeholder,
      required,
      autocomplete,
      disabled,
    },
    ref,
  ) => {
    return (
      <input
        ref={ref}
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
  },
)
Input.displayName = 'Input'
export default Input
