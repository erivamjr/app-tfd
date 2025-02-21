import { createContext, useState, ReactNode, useEffect } from 'react'
import { createSession, dataUser } from '../Hooks/Api/Auth/Auth'
import { useNavigate } from 'react-router-dom'
import { UserProps } from '../Hooks/Api/Appointments/TypeAppointments'
import { AxiosError } from 'axios'
import api from '../../Api'
import { useToast } from './ToastContext'

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextData {
  authenticated: boolean
  user: UserProps | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  authError: string | null
  refreshAvatarUrl: (userId: string) => void
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps | null>(null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { showError } = useToast()

  useEffect(() => {
    const recoveredToken = localStorage.getItem('token')
    const storedAvatarUrl = localStorage.getItem('avatarUrl')
    const storedAvatarExpiry = localStorage.getItem('avatarUrlExpiry')

    if (recoveredToken) {
      api.defaults.headers.Authorization = `Bearer ${recoveredToken}`
    }

    if (storedAvatarUrl && storedAvatarExpiry) {
      const expiryTime = new Date(storedAvatarExpiry).getTime()
      const currentTime = new Date().getTime()

      if (currentTime < expiryTime) {
        setUser(
          (prevUser) =>
            ({
              ...prevUser,
              profileUrlImage: storedAvatarUrl,
            }) as UserProps | null,
        )
      } else if (user?.id) {
        // URL expirou, renovar apenas se user estiver definido
        updateAvatarUrl(user.id)
      }
    }

    setLoading(false)
  }, [user?.id])

  const refreshAvatarUrl = (userId: string) => {
    updateAvatarUrl(userId)
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await createSession(email, password)

      if (response.data && response.data.accessToken) {
        const token = response.data.accessToken
        localStorage.setItem('token', token)
        api.defaults.headers.Authorization = `Bearer ${token}`
        setAuthError(null)

        const userData = await dataUser()
        if (userData.data.user) {
          setUser(userData.data.user)

          if (userData.data.user.id) {
            await updateAvatarUrl(userData.data.user.id)
          }
        }

        navigate('/')
      } else {
        throw new Error('Login falhou')
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          setAuthError('Rota não encontrada. Verifique a URL no backend.')
        } else if (error.response?.status === 401) {
          showError('Credenciais inválidas. Verifique seu email e senha.')
          console.log('Email ou senha incorretos')
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
    localStorage.removeItem('avatarUrl')
    localStorage.removeItem('avatarUrlExpiry')
    setUser(null)
    navigate('/auth')
  }

  const updateAvatarUrl = async (userId: string) => {
    if (!userId) return
    try {
      const response = await api.get(`/users/signed-url/${userId}.png`)
      if (response.data.signedUrl) {
        setUser((prevUser) => {
          if (prevUser) {
            const expiryTime = new Date().getTime() + 3600 * 1000 // 1 hour expiry
            localStorage.setItem('avatarUrl', response.data.signedUrl)
            localStorage.setItem(
              'avatarUrlExpiry',
              new Date(expiryTime).toISOString(),
            )
            return { ...prevUser, profileUrlImage: response.data.signedUrl }
          }
          return prevUser
        })
      }
    } catch (error) {
      console.error('Erro ao atualizar a URL do avatar:', error)
    }
  }

  if (loading) {
    return <div>Carregando...</div>
  }

  return (
    <AuthContext.Provider
      value={{
        authenticated: !!user,
        user,
        login,
        logout,
        authError,
        refreshAvatarUrl,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
