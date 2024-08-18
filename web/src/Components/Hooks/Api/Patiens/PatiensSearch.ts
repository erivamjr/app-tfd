import { useEffect, useState } from 'react'
import axios from 'axios'
import api from '../../../../Api'
import { Patient } from './TypePatiens'

const usePatientsSearch = () => {
  const [patientsSearch, setPatientsSearch] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    const fetchPatientsSearch = async () => {
      try {
        setIsLoading(true)
        const response = await api.get<{
          data: Patient[]
        }>(`/patients`, { signal })

        setPatientsSearch(response.data.data)
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

    fetchPatientsSearch()

    return () => {
      controller.abort()
    }
  }, [])

  return { patientsSearch, isLoading, isError }
}

export default usePatientsSearch
