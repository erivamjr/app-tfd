import { createContext, useContext, useRef, ReactNode } from 'react'
import { Toast } from 'primereact/toast'

interface ToastContextProps {
  showSuccess: (message: string) => void
  showError: (message: string) => void
  showInfo: (message: string) => void
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined)

interface ToastProviderProps {
  children: ReactNode
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const toast = useRef<Toast>(null)

  const showSuccess = (message: string) => {
    toast.current?.show({
      severity: 'success',
      summary: 'Sucesso',
      detail: message,
      life: 3000,
    })
  }

  const showError = (message: string) => {
    toast.current?.show({
      severity: 'error',
      summary: 'Erro',
      detail: message,
      life: 3000,
    })
  }

  const showInfo = (message: string) => {
    toast.current?.show({
      severity: 'info',
      summary: 'Informação',
      detail: message,
      life: 3000,
    })
  }

  return (
    <ToastContext.Provider value={{ showSuccess, showError, showInfo }}>
      <Toast ref={toast} />
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast deve ser usado dentro de um ToastProvider')
  }
  return context
}
