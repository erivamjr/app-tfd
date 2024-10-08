import { useEffect, useState } from 'react'
import axios from 'axios'
import api from '../../../../Api'
import { specialties } from './TypeSpecialties'

const useSpecialties = () => {
  const [specialties, setSpecialties] = useState<specialties[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    const fetchSpecialties = async () => {
      try {
        setIsLoading(true)
        const response = await api.get(`/specialties`, { signal })

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
      controller.abort()
    }
  }, [])

  return { specialties, isLoading, isError }
}

export default useSpecialties
