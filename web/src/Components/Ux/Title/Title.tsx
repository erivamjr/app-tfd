export default function Title({ title, subTitle }) {
  return (
    <div className="mb-1">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-gray-600">{subTitle}</p>
    </div>
  )
}
