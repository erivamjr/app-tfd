const Table = ({ children }) => {
  return (
    <div className="w-full overflow-x-auto bg-white rounded-lg shadow-md">
      <div className="min-w-full divide-y divide-gray-200">{children}</div>
    </div>
  )
}
export default Table
