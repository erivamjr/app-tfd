import { createContext, useState, useEffect } from 'react'
import api from '../../Api'

// Supondo que essas interfaces estão definidas em outro lugar
import {
  SpecialtyProps,
  TypeAppointment,
  UserProps,
} from '../Hooks/Api/Appointments/TypeAppointments'

interface DataContextProps {
  specialties: SpecialtyProps[]
  appointments: TypeAppointment[]
  users: UserProps[]
  addSpecialty: (newSpecialty: string) => void
  fetchAppointments: () => void
  updateSpecialty: (id: number, name: string) => void
  deleteSpecialty: (id: number) => void
}

export const DataContext = createContext({} as DataContextProps)

export const DataProvider = ({ children }) => {
  const [specialties, setSpecialties] = useState<SpecialtyProps[]>([])
  const [appointments, setAppointments] = useState<TypeAppointment[]>([])
  const [users, setUsers] = useState([])

  const addSpecialty = async (newSpecial: string) => {
    const newSpecialty = { name: newSpecial }
    try {
      const response = await api.post('/specialties', newSpecialty)
      setSpecialties((prevSpecialties) => [...prevSpecialties, response.data])
    } catch (error) {
      console.error('Erro ao adicionar nova especialidade:', error)
    }
  }

  const updateSpecialty = async (id: number, name: string) => {
    try {
      await api.put(`/specialties/${id}`, { name })
      setSpecialties(
        specialties.map((specialty) =>
          specialty.id === id ? { ...specialty, name } : specialty,
        ),
      )
    } catch (error) {
      console.error('Erro ao atualizar especialidade:', error)
    }
  }

  const deleteSpecialty = async (id: number) => {
    try {
      await api.delete(`/specialties/${id}`)
      setSpecialties(specialties.filter((specialty) => specialty.id !== id))
    } catch (error) {
      console.error('Erro ao deletar especialidade:', error)
    }
  }

  const fetchAppointments = async () => {
    try {
      const response = await api.get('/appointments')
      setAppointments(response.data)
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error)
    }
  }

  const fetchSpecialties = async () => {
    try {
      const response = await api.get('/specialties')
      const sortedSpecialties: SpecialtyProps[] = response.data.sort((a, b) =>
        a.name.localeCompare(b.name),
      )
      setSpecialties(sortedSpecialties)
    } catch (error) {
      console.error('Erro ao buscar especialidades:', error)
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users')
      setUsers(response.data)
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
    }
  }

  useEffect(() => {
    fetchSpecialties()
    fetchUsers()
    fetchAppointments()
  }, [])

  return (
    <DataContext.Provider
      value={{
        specialties,
        appointments,
        users,
        addSpecialty,
        fetchAppointments,
        updateSpecialty,
        deleteSpecialty,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
