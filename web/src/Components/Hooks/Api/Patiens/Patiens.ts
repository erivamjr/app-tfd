import { useEffect, useState } from 'react'
import axios from 'axios'
import api from '../../../../Api'
import { Patient } from './types'

const usePatients = (currentPage: number, itemsPerPage: number) => {
  const [patients, setPatients] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [totalPages, setTotalPages] = useState<number>(0)

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    const fetchPatients = async () => {
      try {
        setIsLoading(true)
        const response = await api.get<{
          data: Patient[]
          total: number
          pageCount: number
        }>(`/patients?page=${currentPage}&limit=${itemsPerPage}`, { signal })

        setPatients(response.data.data)
        setTotalPages(response.data.pageCount)
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

    fetchPatients()

    return () => {
      controller.abort()
    }
  }, [currentPage, itemsPerPage])

  return { patients, isLoading, isError, totalPages }
}

export default usePatients
