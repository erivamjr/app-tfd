const ModalSpecialties = ({
  isOpen,
  onClose,
  title,
  content,
  confirmAction,
  confirmText,
  isDeleteAction,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 w-11/12 sm:w-1/3">
        {' '}
        {/* Ajuste responsivo */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">{title}</h1>
          <button onClick={onClose} className="text-2xl">
            X
          </button>
        </div>
        <div className="mt-4">{content}</div>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-700"
          >
            Cancelar
          </button>
          <button
            onClick={confirmAction}
            className={`text-white p-2 rounded ${isDeleteAction ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalSpecialties
