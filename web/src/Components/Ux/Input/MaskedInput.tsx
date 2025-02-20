import React from 'react'
import InputMask from 'react-input-mask'

interface MaskedInputProps {
  mask: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

const MaskedInput: React.FC<MaskedInputProps> = ({
  mask,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <InputMask
      mask={mask}
      value={value}
      onChange={onChange}
      className="border border-gray-300 p-2 rounded w-full focus:ring-blue-500 focus:border-blue-500"
      placeholder={placeholder}
    />
  )
}

export default MaskedInput
