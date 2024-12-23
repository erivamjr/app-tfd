export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <div className="flex justify-center mt-6 px-4">
      <div className="flex flex-wrap gap-2 items-center justify-center">
        <button
          onClick={() => onPageChange(currentPage > 1 ? currentPage - 1 : 1)}
          disabled={currentPage === 1}
          className={`
            px-3 py-2 rounded-md text-sm font-medium transition-colors
            ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }
          `}
        >
          &laquo;
        </button>

        <div className="hidden sm:flex gap-2">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`
                px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${
                  page === currentPage
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }
              `}
            >
              {page}
            </button>
          ))}
        </div>

        <div className="sm:hidden">
          <span className="px-3 py-2 text-sm text-gray-700">
            Página {currentPage} de {totalPages}
          </span>
        </div>

        <button
          onClick={() =>
            onPageChange(
              currentPage < totalPages ? currentPage + 1 : totalPages,
            )
          }
          disabled={currentPage === totalPages}
          className={`
            px-3 py-2 rounded-md text-sm font-medium transition-colors
            ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }
          `}
        >
          &raquo;
        </button>
      </div>
    </div>
  )
}
