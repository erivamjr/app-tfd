import React from 'react'
import ReactDOM from 'react-dom'
import { IoMdClose } from 'react-icons/io'
import './style.css'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50  max-h-screen ${
        isOpen ? 'is-open' : ''
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl mx-2 p-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl"
          >
            <IoMdClose />
          </button>
        </div>
        <div className="mt-4">{children}</div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('root') as HTMLElement,
  )
}
