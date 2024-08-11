import { useEffect, useState } from 'react'
import axios from 'axios'

import { TypeAppointment } from './TypeAppointments'
import api from '../../../../Api'

const useAppointment = () => {
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
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message)
        } else {
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
