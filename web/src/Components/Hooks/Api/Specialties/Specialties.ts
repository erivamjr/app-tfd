import { useEffect, useState } from 'react'
import axios from 'axios'
import api from '../../../../Api'
import { SpecialtyProps } from '../Appointments/TypeAppointments'

const useSpecialties = () => {
  const [specialties, setSpecialties] = useState<SpecialtyProps[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        setIsLoading(true)
        const response = await api.get(`/specialties`)

        setSpecialties(response.data)
      } catch (error) {
        if (axios.isAxiosError(error) && error.message === 'canceled') {
          console.error('Error fetching data:', error) // without code
        } else {
          console.error('Error fetching data:', error)
          setIsError(true)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchSpecialties()

    return () => {
      const controller = new AbortController()
      controller.abort()
    }
  }, [])

  return { specialties, isLoading, isError }
}

export default useSpecialties
