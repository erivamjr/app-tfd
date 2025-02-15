import {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react'
import api from '../../Api'
import {
  SpecialtyProps,
  UserProps,
} from '../Hooks/Api/Appointments/TypeAppointments'

// Novo tipo para atualização de usuário
interface UpdateUserData {
  role?: 'admin' | 'user' | 'guest'
  active?: boolean
}

interface UpdateProfileProps {
  name: string
  email: string
  phone: string
  cpf: string
  role: string
  workLocation: string
}

interface DataContextProps {
  specialties: SpecialtyProps[]
  users: UserProps[]
  addSpecialty: (newSpecialty: string) => Promise<void>
  updateSpecialty: (id: string, name: string) => Promise<void>
  deleteSpecialty: (id: string) => Promise<void>
  updateUser: (userId: string, data: UpdateUserData) => Promise<void>
  fetchUsers: () => Promise<void>
  updateProfile: (userId: string, data: UpdateProfileProps) => Promise<void>
}

export const DataContext = createContext({} as DataContextProps)

interface DataProviderProps {
  children: ReactNode
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [specialties, setSpecialties] = useState<SpecialtyProps[]>([])
  const [users, setUsers] = useState<UserProps[]>([])

  const handleError = (error: unknown, message: string) => {
    console.error(message, error)
  }

  const fetchSpecialties = useCallback(async () => {
    try {
      const { data } = await api.get('/specialties')
      setSpecialties(
        data.sort((a: SpecialtyProps, b: SpecialtyProps) =>
          a.name.localeCompare(b.name),
        ),
      )
    } catch (error) {
      handleError(error, 'Erro ao buscar especialidades.')
    }
  }, [])

  const fetchUsers = useCallback(async () => {
    try {
      const { data } = await api.get('/users')
      setUsers(data)
    } catch (error) {
      handleError(error, 'Erro ao buscar usuários.')
    }
  }, [])

  const addSpecialty = async (newSpecialty: string) => {
    try {
      const { data } = await api.post('/specialties', { name: newSpecialty })
      setSpecialties((prev) => [...prev, data])
    } catch (error) {
      handleError(error, 'Erro ao adicionar nova especialidade.')
    }
  }

  const updateSpecialty = async (id: string, name: string) => {
    try {
      await api.put(`/specialties/${id}`, { name })
      setSpecialties((prev) =>
        prev.map((specialty) =>
          specialty.id === id ? { ...specialty, name } : specialty,
        ),
      )
    } catch (error) {
      handleError(error, 'Erro ao atualizar especialidade.')
    }
  }

  const deleteSpecialty = async (id: string) => {
    try {
      await api.delete(`/specialties/${id}`)
      setSpecialties((prev) => prev.filter((specialty) => specialty.id !== id))
    } catch (error) {
      handleError(error, 'Erro ao deletar especialidade.')
    }
  }

  const updateUser = async (userId: string, data: UpdateUserData) => {
    try {
      await api.patch(`/users/${userId}`, data)
      setUsers((prev) =>
        prev.map((user) => (user.id === userId ? { ...user, ...data } : user)),
      )
    } catch (error) {
      handleError(error, 'Erro ao atualizar usuário.')
      throw error
    }
  }

  const updateProfile = async (userId: string, data: UpdateProfileProps) => {
    try {
      await api.patch(`/users/${userId}`, data)

      setUsers((prev) =>
        prev.map((user) => (user.id === userId ? { ...user, ...data } : user)),
      )
    } catch (error) {
      handleError(error, 'Erro ao atualizar perfil.')
      throw error
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchSpecialties(), fetchUsers()])
    }
    fetchData()
  }, [fetchSpecialties, fetchUsers])

  return (
    <DataContext.Provider
      value={{
        specialties,
        users,
        addSpecialty,
        updateSpecialty,
        deleteSpecialty,
        updateUser,
        fetchUsers,
        updateProfile,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
