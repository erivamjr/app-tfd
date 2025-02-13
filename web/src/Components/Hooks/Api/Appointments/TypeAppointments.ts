export interface PatientProps {
  id: string
  name: string
  gender?: string | null
  cpf: string
  rg?: string | null
  address?: string | null
  number?: string | null
  complement?: string | null
  district?: string | null
  city?: string | null
  state?: string | null
  zipCode?: string | null
  phone?: string | null
  susCard?: string | null
  birthDate?: Date | null
  motherName?: string | null
  active?: boolean
  createdAt: Date
  updatedAt: Date
  userId: string
  isPregnant?: boolean
  hasHypertension?: boolean
  hasDiabetes?: boolean
  isBedridden?: boolean
  hasCourtOrder?: boolean
  isSuspected?: boolean
}
export interface SpecialtyProps {
  id: number
  name: string
  active: boolean
}

export interface UserProps {
  id: string
  name: string
  phone: string
  cpf: string
  email: string
  workLocation: string
  profileUrlImage: string
  password?: string
  role: string
  createdAt: string
  updatedAt: string
  active: boolean
}

export enum Priority {
  Normal = 'Normal',
  Elderly = 'Elderly',
  Pregnant = 'Pregnant',
  Child = 'Child',
  Emergency = 'Emergency',
}

export enum Status {
  InProgress = 'InProgress',
  Scheduled = 'Scheduled',
  Completed = 'Completed',
}

export interface TypeAppointment {
  id: string
  specialtyId: number
  patientId: string
  userId: string
  priority: Priority
  diagnosis?: string | null
  cid?: string | null
  requestingDoctor?: string | null
  crm?: string | null
  requestCode?: string | null
  requestDate: string | Date
  status: Status
  notes?: string | null
  active: boolean
  createdAt: string | Date
  updatedAt: string | Date
  patient: PatientProps
  specialty: SpecialtyProps
  user: UserProps
  isPregnant?: boolean
  hasHypertension?: boolean
  hasDiabetes?: boolean
  isBedridden?: boolean
  hasCourtOrder?: boolean
  isSuspected?: boolean
}
