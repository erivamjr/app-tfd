interface TableCellProps {
  children: React.ReactNode
  isHeader?: boolean
  label?: string
}

const TableCell = ({
  children,
  isHeader = false,
  label = '',
}: TableCellProps) => {
  if (isHeader) {
    return (
      <div className="flex-1 p-4 text-left text-sm font-medium text-gray-900">
        {children}
      </div>
    )
  }

  return (
    <div className="flex-1 lg:p-2">
      <div className="flex flex-col lg:flex-row lg:items-center">
        <span className="lg:hidden font-medium text-gray-900 mb-1">
          {label}
        </span>
        <span className="text-gray-700">{children}</span>
      </div>
    </div>
  )
}
export default TableCell
