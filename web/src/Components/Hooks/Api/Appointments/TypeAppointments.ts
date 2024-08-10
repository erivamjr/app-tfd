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

  patientName: string
  patientGender: string
  patientCpf: string
  patientRg: string
  patientAddress: string
  patientPhone: string
  patientSusCard: string
  patientBirthDate: string
  patientMotherName: string
  patientActive: boolean
  patientPriority: string
  patientCreatedAt: string
  patientUpdatedAt: string
  patientUserId: string

  specialtyName: string
  specialtyActive: boolean
}
