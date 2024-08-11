import React, { createContext, useState, ReactNode, useEffect } from 'react'
import { createSession } from '../Hooks/Api/Auth/Auth'
import api from '../../Api'
import { useNavigate } from 'react-router-dom'

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextData {
  authenticated: boolean
  user: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  authError: string | null
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const recoveredUser = localStorage.getItem('user')
    const recoveredToken = localStorage.getItem('token')

    if (recoveredUser && recoveredToken) {
      setUser(JSON.parse(recoveredUser))
      api.defaults.headers.Authorization = `Bearer ${recoveredToken}`
    }

    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await createSession(email, password)

      if (response.data && response.data.accessToken) {
        const loggedUser = response.data
        const token = loggedUser.accessToken

        localStorage.setItem('user', JSON.stringify(loggedUser))
        localStorage.setItem('token', token)

        setUser(loggedUser)
        api.defaults.headers.Authorization = `Bearer ${token}`
        setAuthError(null)

        navigate('/')
      } else {
        throw new Error('Login falhou')
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      setAuthError('Credenciais inválidas. Verifique seu email e senha.')
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
    navigate('/auth')
  }

  if (loading) {
    return <div>Carregando...</div>
  }

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, login, logout, authError }}
    >
      {children}
    </AuthContext.Provider>
  )
}
