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
  active: string
  priority: string
  createdAt: string
  updatedAt: string
  userId: string
  uf: string
  cep: string
  district: string
  complement: string
  city: string
  number: string
}
export interface SpecialtyProps {
  id: number
  specialtyName: string
  specialtyActive: boolean
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
}
