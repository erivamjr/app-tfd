export default function Input({
  type,
  name,
  value,
  onChange,
  list,
  placeholder,
}) {
  return (
    <input
      placeholder={placeholder}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      list={list}
      className="mt-1 block w-full rounded-md p-2 border "
      required
    />
  )
}
