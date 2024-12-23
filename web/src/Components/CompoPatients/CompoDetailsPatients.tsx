import { Link, useParams } from 'react-router-dom'
import AdminToolbar from '../Ux/AdminToolbar/AdminToolbar'
import { ImPrinter } from 'react-icons/im'
import { IoReturnDownBack } from 'react-icons/io5'
import Container from '../Ux/Container/Container'
import DetailsTable from './DetailsTable'
import DisplayMessage from '../Ux/DisplayMessage/DisplayMessage'
import useAppointment from '../Hooks/Api/Appointments/Appointments'
import { useState, useEffect } from 'react'
import api from '../../Api'
import { Patient } from '../Hooks/Api/Patiens/TypePatiens'

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

export default function DetailsPatients() {
  const { id } = useParams<{ id: string }>()

  const {
    appointments,
    isLoading: isAppointmentsLoading,
    isError: isAppointmentsError,
  } = useAppointment()

  const [patient, setPatient] = useState<Patient>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        setIsLoading(true)
        const response = await api.get(`/patients/${id}`)
        setPatient(response.data)
      } catch (error) {
        console.error('Erro ao buscar paciente:', error)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPatient()
  }, [id])

  if (isLoading || isAppointmentsLoading)
    return <DisplayMessage message={'Carregando'} color="green" text="white" />

  if (isError || isAppointmentsError)
    return (
      <DisplayMessage
        message={'Erro na solicitação.'}
        color="red"
        text="white"
      />
    )

  const appointment = appointments
    ? appointments.filter((appointment) => appointment.patient.id === id)
    : []

  if (!patient)
    return (
      <DisplayMessage message={'Nenhum paciente localizado'} text="orange" />
    )

  return (
    <div>
      <AdminToolbar>
        <div className="p-2 flex">
          <div className="font-bold text-black text-2xl flex flex-1 items-center justify-center">
            Detalhes do Paciente
          </div>
          <div className="flex gap-3">
            <div className="bg-blue-600 text-white p-3 text-2xl rounded">
              <ImPrinter />
            </div>
            <Link to="/patients">
              <div className="bg-blue-600 text-white p-3 text-2xl rounded">
                <IoReturnDownBack />
              </div>
            </Link>
          </div>
        </div>
      </AdminToolbar>
      <Container>
        <section>
          <div className="p-1 font-bold text-black">Dados Pessoais</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full p-3 gap-4">
            <div className="flex flex-col gap-2">
              <span>Nome: {patient.name}</span>
              <span>CPF: {patient.cpf}</span>
              <span>RG: {patient.rg}</span>
              <span>Cartão SUS: {patient.susCard}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span>Telefone: {patient.phone}</span>
              <span>Mãe: {patient.motherName}</span>
              <span>Logradouro: {patient.address}</span>
              <span>Cidade: {patient.city}</span>
            </div>
            <div className="flex flex-col gap-2">
              {/* Adicione mais informações aqui caso necessário */}
            </div>
          </div>
          <div className="p-1 text-black font-bold">Histórico</div>
        </section>
        <DetailsTable
          item={appointment}
          isErrorPoint={isAppointmentsError}
          isLoadingPoint={isAppointmentsLoading}
        />
      </Container>
    </div>
  )
}
