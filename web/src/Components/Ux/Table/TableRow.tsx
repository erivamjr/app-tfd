interface TableRowProps {
  children: React.ReactNode
  isHeader?: boolean
  className?: string
}

const TableRow = ({ children, isHeader = false }: TableRowProps) => {
  return (
    <div
      className={
        isHeader
          ? 'hidden lg:flex lg:w-full border-b bg-gray-100 border-gray-200'
          : 'flex w-full items-center flex-col lg:flex-row p-4 lg:p-0 gap-2 lg:gap-0 border-b border-gray-200 hover:bg-gray-50'
      }
    >
      {children}
    </div>
  )
}
export default TableRow
