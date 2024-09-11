import { CiSearch } from 'react-icons/ci'
import DisplayMessage from '../Ux/DisplayMessage/DisplayMessage'
import Input from '../Ux/Input/Input'
import TableCell from '../Ux/Table/TableCell'
import TableRow from '../Ux/Table/TableRow'
import Table from '../Ux/Table/Table'

interface AppointmentItem {
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
  patient: {
    id: string
    name: string
    gender: string
    cpf: string
    rg: string
    address: string
    number: string
    complement: string
    district: string
    city: string
    state: string
    zipCode: string
    phone: string
    susCard: string
    birthDate: string
    motherName: string
    active: boolean
    createdAt: string
    updatedAt: string
    userId: string
  }
  specialty: { id: number; name: string; active: boolean }
  user: {
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
}

interface DetailsTableProps {
  item: AppointmentItem
  isLoadingPoint: boolean
  isErrorPoint: boolean
}

const DetailsRequestTable = ({
  item,
  isLoadingPoint,
  isErrorPoint,
}: DetailsTableProps) => {
  if (isLoadingPoint) {
    return <DisplayMessage message="Carregando" color="green" text="white" />
  }

  if (isErrorPoint) {
    return (
      <DisplayMessage message="Erro na solicitação." color="red" text="white" />
    )
  }

  if (!item) {
    return (
      <DisplayMessage message="Consultando ..." color="yellow" text="white" />
    )
  }

  return (
    <div>
      <div className="flex flex-1 items-center space-x-2">
        <Input
          type="text"
          name="search"
          value=""
          onChange={() => {}}
          placeholder="Pesquisar"
        />
        <button className="bg-blue-600 text-white hover:bg-blue-500 p-3 rounded">
          <CiSearch />
        </button>
      </div>

      <Table>
        <TableRow>
          <TableCell isHeader>Prioridade</TableCell>
          <TableCell isHeader>Diagnóstico</TableCell>
          <TableCell isHeader>Exame</TableCell>
          <TableCell isHeader>Solicitação</TableCell>
          <TableCell isHeader>CID</TableCell>
          <TableCell isHeader>Médico</TableCell>
          <TableCell isHeader>CRM</TableCell>
          <TableCell isHeader>Agendamento</TableCell>
          <TableCell isHeader>Status</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{item.priority}</TableCell>
          <TableCell>{item.diagnosis}</TableCell>
          <TableCell>{item.specialty.name}</TableCell>
          <TableCell>
            {new Date(item.appointmentDate).toLocaleDateString()}
          </TableCell>
          <TableCell>{item.cid}</TableCell>
          <TableCell>{item.requestingDoctor}</TableCell>
          <TableCell>{item.crm}</TableCell>
          <TableCell>
            {new Date(item.appointmentDate).toLocaleDateString()}
          </TableCell>
          <TableCell>
            {item.status === 'InProgress' ? 'Em andamento' : item.status}
          </TableCell>
        </TableRow>
      </Table>
    </div>
  )
}
export default DetailsRequestTable
