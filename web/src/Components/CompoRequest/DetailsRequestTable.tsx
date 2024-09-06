import React from 'react'
import DisplayMessage from '../Ux/DisplayMessage/DisplayMessage'
import { Pagination } from '../Ux/table/Pagination '
import Table from '../Ux/table/Table'
import TableCell from '../Ux/table/TableCell'
import TableRow from '../Ux/table/TableRow'
import { CiSearch } from 'react-icons/ci'
import Input from '../Ux/Input/Input'

// Use the previously defined AppointmentItem interface
interface AppointmentItem {
  id: string
  specialtyId: number
  patientId: string
  userId: string
  priority: 'Normal' | 'High' | 'Low'
  appointmentDate: string
  diagnosis: string
  cid: string
  requestingDoctor: string
  crm: string
  requestCode: string
  requestDate: string
  status: 'InProgress' | 'Completed' | 'Pending'
  notes: string
  active: boolean
  createdAt: string
  updatedAt: string
  patient: {
    id: string
    name: string
    gender: 'M' | 'F'
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
    role: 'admin' | 'user'
    createdAt: string
    updatedAt: string
    active: boolean
  }
}

interface DetailsTableProps {
  item: AppointmentItem | null // Adjusted type to match the defined interface
  isLoadingPoint: boolean
  isErrorPoint: boolean
}

export default function DetailsRequestTable({
  item,
  isLoadingPoint,
  isErrorPoint,
}: DetailsTableProps) {
  if (isLoadingPoint) {
    return <DisplayMessage message={'Carregando'} color="green" text="white" />
  }

  console.log(item)
  if (isErrorPoint) {
    return (
      <DisplayMessage
        message={'Erro na solicitação.'}
        color="red"
        text="white"
      />
    )
  }

  if (!item) {
    return (
      <DisplayMessage message={'Consultando ...'} color="yellow" text="white" />
    )
  }

  return (
    <div>
      <div className="flex flex-1 items-center space-x-2">
        <Input
          type="text"
          name="pesquisar"
          placeholder="Pesquisar"
          className="flex-1"
        />
        <button className="bg-blue-600 text-white hover:bg-blue-500 p-3 rounded">
          <CiSearch />
        </button>
      </div>

      <Table>
        <TableRow isHeader>
          <TableCell>Prioridade</TableCell>
          <TableCell>Diagnóstico</TableCell>
          <TableCell>Exame</TableCell>
          <TableCell>Solicitação</TableCell>
          <TableCell>CID</TableCell>
          <TableCell>Médico</TableCell>
          <TableCell>CRM</TableCell>
          <TableCell>Agendamento</TableCell>
          <TableCell>Status</TableCell>
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
            {item.status === 'InProgress' && 'Em andamento'}
          </TableCell>
        </TableRow>
        <Pagination />
      </Table>
    </div>
  )
}
