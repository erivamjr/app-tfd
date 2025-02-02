import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../../Api'
import { userMutationKeys } from '../../../../keys/mutations'
import { userQueryKeys } from '../../../../keys/queries'
import { UserProps } from '../Appointments/TypeAppointments'

interface UpdateProfileProps {
  name: string
  email: string
  phone: string
  cpf: string
  role: string
  workLocation: string
  profileUrlImage?: string
}

export const useUpdateProfile = (userId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: userMutationKeys.update(userId),
    mutationFn: async (data: UpdateProfileProps) => {
      const { data: updatedProfile } = await api.patch(`/users/${userId}`, {
        name: data?.name?.trim(),
        email: data?.email?.trim(),
        phone: data?.phone?.trim(),
        cpf: data?.cpf?.trim(),
        role: data?.role?.trim(),
        workLocation: data?.workLocation?.trim(),
        profileUrlImage: data?.profileUrlImage?.trim(),
      })

      if (!updatedProfile) {
        throw new Error('A resposta da API não contém dados válidos.')
      }

      queryClient.setQueryData(userQueryKeys.getOne(userId), updatedProfile)

      queryClient.setQueryData(
        userQueryKeys.getAll(),
        (oldUsers: UserProps[]) => {
          if (!Array.isArray([oldUsers])) {
            throw new Error('A lista de usuários não é um array.')
          }

          return oldUsers.map((oldUser: UserProps) => {
            if (oldUser.id === userId) {
              return updatedProfile
            }

            return oldUser
          })
        },
      )
    },
  })
}
