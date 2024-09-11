export default function TableRow({ children }) {
  return (
    <div className="flex flex-col lg:table-row lg:table lg:w-full">
      {children}
    </div>
  )
}
