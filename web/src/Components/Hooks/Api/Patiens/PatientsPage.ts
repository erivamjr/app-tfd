import { useEffect, useState } from 'react'
import axios from 'axios'
import api from '../../../../Api'
import { Patient } from './TypePatiens'

const usePatientsPage = (currentPage: number, itemsPerPage: number) => {
  const [patientsPage, setPatientsPage] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [totalPages, setTotalPages] = useState<number>(0)

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    const fetchPatientsPage = async () => {
      try {
        setIsLoading(true)
        const response = await api.get<{
          data: Patient[]
          total: number
          pageCount: number
        }>(`/patients?page=${currentPage}&limit=${itemsPerPage}`, { signal })

        setPatientsPage(response.data.data)
        setTotalPages(response.data.pageCount)
      } catch (error) {
        if (axios.isAxiosError(error) && error.message === 'canceled') {
          console.log('Request was canceled.')
        } else {
          console.error('Error fetching data:', error)
          setIsError(true)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchPatientsPage()

    return () => {
      controller.abort()
    }
  }, [currentPage, itemsPerPage])

  return { patientsPage, isLoading, isError, totalPages }
}

export default usePatientsPage
