export const formatCPF = (cpf: string) => {
  return cpf.replace(/[.\\-]/g, '')
}
