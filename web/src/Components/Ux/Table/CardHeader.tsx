export const CardHeader = ({ headers }) => {
  return (
    <div className="lg:hidden bg-gray-50 px-4 py-3 rounded-t-lg border-b border-gray-200">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">
          Campos disponíveis
        </h3>
        <span className="text-xs text-gray-500">{headers.length} colunas</span>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {headers.map((header, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
          >
            {header}
          </span>
        ))}
      </div>
    </div>
  )
}
