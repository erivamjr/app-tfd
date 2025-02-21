import { z } from 'zod'

export const schemaPatient = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  cpf: z
    .string()
    .min(14, 'O CPF deve ter 11 caracteres')
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
  rg: z.string().min(6, 'O RG deve ter 9 caracteres'),
  phone: z
    .string()
    .min(15, 'O telefone deve ter 10 caracteres')
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'Número inválido'),
  gender: z.string().min(1, 'O sexo deve ter pelo menos 1 caractere'),
  susCard: z.string().min(1, 'O cartão SUS deve ter pelo menos 1 caractere'),
  birthDate: z
    .string()
    .min(1, 'A data de nascimento deve ter pelo menos 1 caractere'),
  motherName: z
    .string()
    .min(1, 'O nome da mae deve ter pelo menos 1 caractere'),
  address: z.string().min(1, 'O endereço deve ter pelo menos 1 caractere'),
  number: z.string().min(1, 'O número deve ter pelo menos 1 caractere'),
  complement: z.string(),
  state: z.string().min(1, 'O estado deve ter pelo menos 1 caractere'),
  district: z.string().min(1, 'O bairro deve ter pelo menos 1 caractere'),
  city: z.string().min(1, 'A cidade deve ter pelo menos 1 caractere'),
  zipCode: z.string().min(1, 'O CEP deve ter pelo menos 1 caractere'),
})

export type PatientFormData = z.infer<typeof schemaPatient>
