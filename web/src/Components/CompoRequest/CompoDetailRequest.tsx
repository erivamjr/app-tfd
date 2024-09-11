import { Link, useParams } from 'react-router-dom'
import AdminToolbar from '../Ux/AdminToolbar/AdminToolbar'
import { ImPrinter } from 'react-icons/im'
import { IoReturnDownBack } from 'react-icons/io5'
import Container from '../Ux/Container/Container'
import DisplayMessage from '../Ux/DisplayMessage/DisplayMessage'
import useAppointment from '../Hooks/Api/Appointments/Appointments'
import DetailsRequestTable from './DetailsRequestTable'
import { CiSearch } from 'react-icons/ci'
import Input from '../Ux/Input/Input'

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

export interface UserProps {
  id: string
  name: string
  phone: string
  cpf: string
  email: string
  password: string
  role: string
  createdAt: string
  updatedAt: string
  active: boolean
}

export interface TypeAppointment {
  id: string
  specialtyId: number
  patientId: string
  userId: string
  priority: 'Pregnant' | 'Child' | 'Normal' | 'Elderly' | 'Emergency'
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

export default function CompoDetailsRequest() {
  const { id } = useParams<{ id: string }>()
  const { appointments, isLoading, isError } = useAppointment()

  const appointment = appointments.find((appointment) => appointment.id === id)

  if (!appointment) {
    return <DisplayMessage message="Agendamento não encontrado." />
  }

  const { patient } = appointment
  return (
    <div>
      <div className="flex flex-1 items-center space-x-2">
        <Input
          type="text"
          name="pesquisar"
          placeholder="Pesquisar"
          value=""
          onChange={() => {}}
        />
        <button className="bg-blue-600 text-white hover:bg-blue-500 p-3 rounded">
          <CiSearch />
        </button>
      </div>
      <AdminToolbar>
        <div className="p-2 flex">
          <div className="font-bold text-black text-2xl flex flex-1 items-center justify-center">
            Detalhes da solicitação
          </div>
          <div className="flex gap-3">
            <div className="bg-blue-600 text-white p-3 text-2xl rounded">
              <ImPrinter />
            </div>
            <Link to="/solicitacao">
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
          <div className="grid grid-cols-3 w-full p-3">
            <div className="flex flex-col gap-2">
              <span>Nome: {patient.name}</span>
              <span>Gênero: {patient.gender}</span>
              <span>CPF: {patient.cpf}</span>
              <span>RG: {patient.rg}</span>
              <span>Cartão SUS: {patient.susCard}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span>Telefone: {patient.phone}</span>
              <span>Mãe: {patient.motherName}</span>
              <span>Logradouro: {patient.address}</span>
              <span>Estado: {patient.uf}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span>Cep: {patient.cep}</span>
              <span>Número: {patient.number}</span>
              <span>Bairro: {patient.district}</span>
              <span>Complemento: {patient.complement}</span>
            </div>
          </div>
          <div className="p-1 text-black font-bold">Histórico</div>
        </section>
        <DetailsRequestTable
          item={appointment}
          isError={isError}
          isLoading={isLoading}
        />
      </Container>
    </div>
  )
}
