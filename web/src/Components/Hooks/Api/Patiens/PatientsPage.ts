import { useEffect, useState } from 'react'
import axios from 'axios'
import api from '../../../../Api'
import { Patient } from './TypePatiens'

const usePatientsPage = (
  currentPage: number,
  itemsPerPage: number,
  searchTerm: string,
) => {
  const [patientsPage, setPatientsPage] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [totalPages, setTotalPages] = useState<number>(0)

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    const fetchPatientsPage = async () => {
      setIsLoading(true)
      setIsError(false)

      try {
        let response

        if (searchTerm) {
          response = await api.get<Patient[]>(
            `/patients/search?name=${searchTerm}`,
            { signal },
          )
          setPatientsPage(response.data)
        } else {
          response = await api.get<{
            data: Patient[]
            total: number
            pageCount: number
          }>(`/patients?page=${currentPage}&limit=${itemsPerPage}`, { signal })

          setPatientsPage(response.data.data)
          setTotalPages(response.data.pageCount)
        }
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

    fetchPatientsPage()

    return () => {
      controller.abort()
    }
  }, [currentPage, itemsPerPage, searchTerm])

  return { patientsPage, setPatientsPage, isLoading, isError, totalPages }
}

export default usePatientsPage
