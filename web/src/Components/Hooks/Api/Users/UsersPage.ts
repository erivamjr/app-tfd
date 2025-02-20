import { useEffect, useState } from 'react'
import api from '../../../../Api'

export interface User {
  id: string
  name: string
  email: string
  phone: string
  cpf: string
  workLocation: string
  role: 'admin' | 'user' | 'guest'
  active: boolean
}

interface UsersResponse {
  data: User[]
  total: number
  page: number
  limit: number
}

export function useUsersPage(initialPage = 1, initialLimit = 10) {
  const [users, setUsers] = useState<User[]>([])
  const [page, setPage] = useState(initialPage)
  const [limit, setLimit] = useState(initialLimit)
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true)
      try {
        const response = await api.get<UsersResponse>(
          `/users?page=${page}&limit=${limit}&orderBy=workLocation&orderDirection=desc`,
        )
        setUsers(response.data.data)
        const totalPages = Math.ceil(response.data.total / limit)
        setTotal(totalPages)
      } catch (error) {
        console.error('Erro ao buscar usuários:', error)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [page, limit])

  return { users, total, page, limit, setPage, setLimit, isLoading, isError }
}
