import axios from 'axios'
import { useState, useEffect } from 'react'
import api from '../../../../Api'
import { TypeAppointment } from './TypeAppointments'

export const useAppointmentsPage = (
  currentPage: number,
  itemsPerPage: number,
  filteredAppointments,
) => {
  const [appointmentsPage, setAppointmentsPage] = useState<TypeAppointment[]>(
    [],
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [totalPages, setTotalPages] = useState<number>(0)

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller as AbortController

    const fetchAppointmentsPage = async () => {
      setIsLoading(true)
      setIsError(false)

      try {
        const { data } = await api.get(`/appointments/filtered`, {
          params: {
            page: currentPage,
            limit: itemsPerPage,
            orderBy: 'createdAt',
            orderDirection: 'desc',
            ...filteredAppointments,
          },
          signal,
        })

        const pageCount = Math.ceil(data.total / itemsPerPage)
        setAppointmentsPage(data.data)
        setTotalPages(pageCount)
      } catch (error) {
        if (axios.isCancel(error)) {
          // Log opcional para fins de debug
          return
        } else {
          console.error('Error fetching data:', error)
          setIsError(true)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchAppointmentsPage()

    return () => {
      controller.abort()
    }
  }, [currentPage, itemsPerPage, filteredAppointments])

  return {
    appointmentsPage,
    isLoading,
    isError,
    totalPages,
    setAppointmentsPage,
  }
}
