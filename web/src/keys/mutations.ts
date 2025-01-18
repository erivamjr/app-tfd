export const userMutationKeys = {
  create: () => ['createuser'],
  delete: (userId: string) => ['deleteuser', userId],
  update: (userId: string) => ['updateuser', userId],
}
