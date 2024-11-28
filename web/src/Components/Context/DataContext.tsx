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
  addSpecialty: (newSpecialty: SpecialtyProps) => void
  fetchAppointments: () => void
}

export const DataContext = createContext({} as DataContextProps)

export const DataProvider = ({ children }) => {
  const [specialties, setSpecialties] = useState<SpecialtyProps[]>([])
  const [appointments, setAppointments] = useState<TypeAppointment[]>([])
  const [users, setUsers] = useState([])

  const addSpecialty = async (newSpecialty: SpecialtyProps) => {
    try {
      await api.post('/specialties', newSpecialty)
      setSpecialties((prevSpecialties) => [...prevSpecialties, newSpecialty])
    } catch (error) {
      console.error('Erro ao adicionar nova especialidade:', error)
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
      setSpecialties(response.data)
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
    fetchAppointments() // Buscar agendamentos quando o componente montar
  }, [])

  return (
    <DataContext.Provider
      value={{
        specialties,
        appointments,
        users,
        addSpecialty,
        fetchAppointments,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
