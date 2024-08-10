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
        const response = await api.get<{ data: TypeAppointment[] }>(
          '/appointments',
          {
            signal,
          },
        )
        setAppointments(response.data)
      } catch (error) {
        if (axios.isAxiosError(error) && error.message === 'canceled') {
          console.log('Request cancelled')
        } else {
          console.error('Error fetching data:', error)
          setIsError(true)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchAppointments()
    console.log(appointments)
    return () => {
      controller.abort()
    }
  }, [])

  return { appointments, isLoading, isError }
}

export default useAppointment
