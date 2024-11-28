import { createContext, useState, useEffect } from 'react'
import api from '../../Api'

// Supondo que essas interfaces estão definidas em outro lugar
import {
  SpecialtyProps,
  TypeAppointment,
} from '../Hooks/Api/Appointments/TypeAppointments'

interface DataContextProps {
  specialties: SpecialtyProps[]
  appointments: TypeAppointment[]
  addSpecialty: (newSpecialty: SpecialtyProps) => void
  fetchAppointments: () => void
}

export const DataContext = createContext({} as DataContextProps)

export const DataProvider = ({ children }) => {
  const [specialties, setSpecialties] = useState<SpecialtyProps[]>([])
  const [appointments, setAppointments] = useState<TypeAppointment[]>([])

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

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await api.get('/specialties')
        setSpecialties(response.data)
      } catch (error) {
        console.error('Erro ao buscar especialidades:', error)
      }
    }

    fetchSpecialties()
    fetchAppointments() // Buscar agendamentos quando o componente montar
  }, [])

  return (
    <DataContext.Provider
      value={{ specialties, appointments, addSpecialty, fetchAppointments }}
    >
      {children}
    </DataContext.Provider>
  )
}
