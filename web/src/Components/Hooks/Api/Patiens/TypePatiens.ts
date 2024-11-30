// export interface Patient {
//   usuario?: string
//   createdAt?: string | number | Date
//   id: string
//   name: string
//   cpf: string
//   rg: string
//   susCard: string
//   phone: string
//   motherName: string
//   address: string
//   city: string
// }

export interface UserProps {
  id: string
  name: string
  phone?: string | null
  cpf: string
  email: string
  password: string
  role: 'admin' | 'user' | 'guest'
  createdAt: Date
  updatedAt: Date
  active: boolean
}
export interface Patient {
  id: string
  name: string
  gender: 'Male' | 'Female' | 'Other'
  cpf: string
  rg: string
  address: string
  number?: number | null
  complement?: string | null
  district?: string | null
  city?: string | null
  state?: string | null
  zipCode?: number | null
  phone: string
  susCard: string
  birthDate: Date
  motherName: string
  active: boolean
  createdAt: Date
  updatedAt: Date
  userId: string
  user: UserProps
}
