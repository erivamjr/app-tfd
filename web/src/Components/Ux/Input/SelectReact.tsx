import CreatableSelect from 'react-select/creatable'

export function SelectReact({ options, selected, handleChange, placeholder }) {
  return (
    <CreatableSelect
      placeholder={placeholder}
      isClearable
      options={options}
      value={selected ? { value: selected, label: selected } : null}
      onChange={handleChange}
      styles={{
        control: (provided, state) => ({
          ...provided,
          borderColor: state.isFocused ? '#121212' : '#d9d9d9',
          boxShadow: state.isFocused ? '0 0 0 1px #121212' : 'none',
          '&:hover': {
            borderColor: '#121212',
          },
        }),
        menu: (base) => ({
          ...base,
          marginTop: '0.5rem',
          borderRadius: '0.25rem',
          boxShadow:
            '0 0 0 1px rgba(0, 0, 0, 0.05), 0 4px 11px rgba(0, 0, 0, 0.1)',
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isSelected ? '#e0e0e0' : 'white',
          ':hover': {
            backgroundColor: '#f0f0f0',
          },
        }),
      }}
    />
  )
}
