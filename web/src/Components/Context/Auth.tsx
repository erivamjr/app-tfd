import { createContext, useState, ReactNode, useEffect } from 'react'
import { createSession, dataUser } from '../Hooks/Api/Auth/Auth'

import { useNavigate } from 'react-router-dom'
import { UserProps } from '../Hooks/Api/Appointments/TypeAppointments'
import { AxiosError } from 'axios'
import api from '../../Api'

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextData {
  authenticated: boolean
  user: UserProps | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  authError: string | null
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps | null>(null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)
  const navigate = useNavigate()

  // console.log('ENTROU NO USEEFFECT', user)
  useEffect(() => {
    // const recoveredUser = localStorage.getItem('user')
    const recoveredToken = localStorage.getItem('token')

    if (recoveredToken) {
      // setUser(JSON.parse(recoveredUser))
      api.defaults.headers.Authorization = `Bearer ${recoveredToken}`
    }

    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await createSession(email, password)

      if (response.data && response.data.accessToken) {
        const token = response.data.accessToken

        localStorage.setItem('token', token)
        api.defaults.headers.Authorization = `Bearer ${token}`
        setAuthError(null)

        const userData = await dataUser()
        setUser(userData.data.user)

        navigate('/')
      } else {
        throw new Error('Login falhou')
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          setAuthError('Rota não encontrada. Verifique a URL no backend.')
        } else if (error.response?.status === 401) {
          setAuthError('Credenciais inválidas. Verifique seu email e senha.')
        } else {
          setAuthError('Erro inesperado. Tente novamente mais tarde.')
        }
      } else {
        setAuthError('Erro inesperado. Tente novamente mais tarde.')
      }
      console.error('Erro ao fazer login:', error)
    }
  }

  const logout = () => {
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
