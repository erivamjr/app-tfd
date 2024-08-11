import React from 'react'

export default function TableCell({ children, isHeader = false }) {
  return (
    <div
      className={`table-cell flex p-2 border ${isHeader ? 'font-bold bg-gray-100' : ''}`}
    >
      {children}
    </div>
  )
}
