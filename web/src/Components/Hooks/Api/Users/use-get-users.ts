import { useQuery } from '@tanstack/react-query'
import api from '../../../../Api'
import { UserProps } from '../Appointments/TypeAppointments'

export const useGetUsers = () => {
  return useQuery<UserProps[]>({
    queryKey: ['users'], // Chave de cache do React Query
    queryFn: async () => {
      const { data: users } = await api.get('/users')

      return users
    },
  })
}
