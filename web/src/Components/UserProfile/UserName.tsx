export default function UserName({ name, local }) {
  return (
    <div>
      <h3 className=" text-gray-500 font-bold">{name}</h3>
      <h3 className=" text-gray-500 font-normal">{local}</h3>
    </div>
  )
}
