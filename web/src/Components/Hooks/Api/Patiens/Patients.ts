import { useEffect, useState } from 'react'
import axios from 'axios'
import api from '../../../../Api'
import { Patient } from './TypePatiens'

const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    const fetchPatients = async () => {
      try {
        setIsLoading(true)
        const response = await api.get<{
          data: Patient[]
        }>(`/patients`, { signal })

        setPatients(response.data.data)
      } catch (error) {
        if (axios.isAxiosError(error) && error.message === 'canceled') {
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
  }, [])

  return { patients, isLoading, isError }
}

export default usePatients
