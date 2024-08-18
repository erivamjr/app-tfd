import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)
  return (
    <div className="flex justify-center mt-4">
      <div className="flex gap-3">
        <button
          onClick={() => onPageChange(currentPage > 1 ? currentPage - 1 : 1)}
          className="px-4 py-2 bg-gray-200"
          disabled={currentPage === 1}
        >
          &laquo;
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() =>
            onPageChange(
              currentPage < totalPages ? currentPage + 1 : totalPages,
            )
          }
          className="px-4 py-2 bg-gray-200"
          disabled={currentPage === totalPages}
        >
          &raquo;
        </button>
      </div>
    </div>
  )
}
