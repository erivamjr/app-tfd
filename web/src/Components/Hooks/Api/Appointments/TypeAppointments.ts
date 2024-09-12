import { UserProps } from '../../../CompoRequest/CompoDetailRequest'

export interface PatientProps {
  id: string
  name: string
  gender: string
  cpf: string
  rg: string
  address: string
  phone: string
  susCard: string
  birthDate: string
  motherName: string
  active: boolean
  createdAt: string
  updatedAt: string
  userId: string
  state: string
  zipCode: string
  cep: string
  district: string
  complement: string
  city: string
  number: string
}
export interface SpecialtyProps {
  id: number
  name: string
  active: boolean
}

export interface TypeAppointment {
  id: string
  specialtyId: number
  patientId: string
  userId: string
  priority: string
  appointmentDate: string
  diagnosis: string
  cid: string
  requestingDoctor: string
  crm: string
  requestCode: string
  requestDate: string
  status: string
  notes: string
  active: boolean
  createdAt: string
  updatedAt: string
  patient: PatientProps
  specialty: SpecialtyProps
  user: UserProps
}
