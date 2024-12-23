import { Link, useParams } from 'react-router-dom'
import AdminToolbar from '../Ux/AdminToolbar/AdminToolbar'
import { ImPrinter } from 'react-icons/im'
import { IoReturnDownBack } from 'react-icons/io5'
import Container from '../Ux/Container/Container'
import DisplayMessage from '../Ux/DisplayMessage/DisplayMessage'
import useAppointment from '../Hooks/Api/Appointments/Appointments'
import { CiSearch } from 'react-icons/ci'
import Input from '../Ux/Input/Input'

export default function CompoDetailsRequest() {
  const { id } = useParams<{ id: string }>()
  const { appointments } = useAppointment()

  const appointment = appointments.find((appointment) => appointment.id === id)
  appointment && console.log('CONSOLANDO', appointment)

  if (!appointment) {
    return <DisplayMessage message="Agendamento não encontrado." />
  }
  const appointmentDate = new Date(appointment.createdAt)
  const formattedDate = appointmentDate.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

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
            <Link to="/requests">
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
              <span>Estado: {patient.state}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span>Cep: {patient.zipCode}</span>
              <span>Número: {patient.number}</span>
              <span>Bairro: {patient.district}</span>
              <span>Complemento: {patient.complement}</span>
            </div>
          </div>

          <hr className="my-4" />

          <div className="p-1 text-black font-bold">
            Detalhes do Agendamento
          </div>

          <div className="grid grid-cols-3 w-full p-3">
            <div className="flex flex-col gap-2">
              <span>Especialidade: {appointment.specialty.name}</span>
              <span>Prioridade: {appointment.priority}</span>
              <span>CID: {appointment.cid}</span>
              <span>Diagnóstico: {appointment.diagnosis}</span>
              <span>Estatus: {appointment.status}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span>Médico: {appointment.requestingDoctor}</span>
              <span>CRM: {appointment.crm}</span>
              <span>Código de Solicitação: {appointment.requestCode}</span>
              <span>Data da Solicitação: {formattedDate}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span>Usuario de Solicitação: {appointment.user.name}</span>
              <span className="bg-yellow-100  p-2 rounded-md">
                Observação: {appointment.notes}
              </span>
            </div>
          </div>
        </section>
      </Container>
    </div>
  )
}
