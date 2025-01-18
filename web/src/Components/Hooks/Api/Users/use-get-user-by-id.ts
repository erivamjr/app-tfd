import { useQuery } from '@tanstack/react-query'

import { UserProps } from '../Appointments/TypeAppointments'
import api from '../../../../Api'

export const useGetUserById = (
  userId: string,
  onSuccess: (user: UserProps) => void, // Passar função de sucesso, caso queira
) => {
  return useQuery({
    queryKey: ['user', userId], // Chave de cache do React Query
    queryFn: async () => {
      const { data: user } = await api.get(`/users/${userId}`)
      onSuccess(user) // Se você quiser executar algo após o sucesso, como atualizar o estado
      return user
    },
  })
}
