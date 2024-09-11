import { ChangeEvent, FormEvent } from 'react'

export interface AuthContextType {
  autenticado: boolean
  login: (email: string, password: string) => void
}

export interface InputProps {
  type: string
  name: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
}

export interface ButtonProps {
  onClick: (e: FormEvent<HTMLFormElement>) => void
  title: string
}
