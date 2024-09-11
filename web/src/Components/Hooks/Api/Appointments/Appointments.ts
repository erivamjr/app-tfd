import { useEffect, useState } from 'react'
import axios from 'axios'
import { TypeAppointment } from './TypeAppointments'
import api from '../../../../Api'

// Definindo o tipo de retorno do hook
type UseAppointmentReturn = {
  appointments: TypeAppointment[]
  isLoading: boolean
  isError: boolean
  countAppointments: number
  countInProgress: number
}

const useAppointment = (): UseAppointmentReturn => {
  const [appointments, setAppointments] = useState<TypeAppointment[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    const fetchAppointments = async () => {
      try {
        setIsLoading(true)
        const response = await api.get<TypeAppointment[]>('/appointments', {
          signal,
        })
        setAppointments(response.data)
        setIsLoading(false)
      } catch (error) {
        if (!axios.isCancel(error)) {
          setIsError(true)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchAppointments()

    return () => {
      controller.abort()
    }
  }, [])

  const countAppointments = appointments.length
  const countInProgress = appointments.filter(
    (appointment) => appointment.status === 'InProgress',
  ).length

  return {
    appointments,
    isLoading,
    isError,
    countAppointments,
    countInProgress,
  }
}

export default useAppointment
