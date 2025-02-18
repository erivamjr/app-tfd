import React, { forwardRef } from 'react'
import InputMask from 'react-input-mask'

interface MaskedInputProps {
  mask: string
  type: string
  name: string
  value?: string | number | readonly string[] | undefined
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  autocomplete?: string
  disabled?: boolean
  className?: string
}

const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  (
    {
      mask,
      type,
      name,
      value,
      onChange,
      placeholder,
      required,
      autocomplete,
      disabled,
      className,
    },
    ref,
  ) => {
    return (
      <InputMask mask={mask} value={value} onChange={onChange}>
        {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
          <input
            ref={ref}
            {...inputProps}
            type={type}
            name={name}
            placeholder={placeholder}
            required={required}
            autoComplete={autocomplete}
            disabled={disabled}
            className={
              className ||
              (disabled
                ? 'cursor-not-allowed w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-500'
                : 'w-full border border-gray-300 rounded-md p-2')
            }
          />
        )}
      </InputMask>
    )
  },
)

MaskedInput.displayName = 'MaskedInput'

export default MaskedInput
