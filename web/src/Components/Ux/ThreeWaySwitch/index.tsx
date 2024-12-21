export type UserRole = 'admin' | 'user' | 'guest'

interface ThreeWaySwitchProps {
  options: { value: UserRole; label: string; color: string }[]
  value: UserRole
  onChange: (value: UserRole) => void
}

export const ThreeWaySwitch = ({
  options,
  value,
  onChange,
}: ThreeWaySwitchProps) => {
  return (
    <div className="inline-flex gap-1 flex-wrap justify-center lg:justify-start">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`
            px-3 py-1.5 rounded-md text-sm font-medium transition-all
            hover:opacity-90 min-w-[70px]
            ${
              value === option.value
                ? `${option.color} shadow-sm`
                : 'bg-gray-100 hover:bg-gray-200'
            }
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
