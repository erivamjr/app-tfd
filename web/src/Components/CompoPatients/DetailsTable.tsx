import React from 'react'
import DisplayMessage from '../Ux/DisplayMessage/DisplayMessage'
import Table from '../Ux/table/Table'
import TableRow from '../Ux/table/TableRow'
import TableCell from '../Ux/table/TableCell'
import { CiSearch } from 'react-icons/ci'
import Input from '../Ux/Input/Input'

interface DetailsTableProps {
  item: any
  isLoadingPoint: boolean
  isErrorPoint: boolean
}

export default function DetailsTable({
  item,
  isLoadingPoint,
  isErrorPoint,
}: DetailsTableProps) {
  if (isLoadingPoint)
    return <DisplayMessage message={'Carregando'} color="green" text="white" />

  if (isErrorPoint)
    return (
      <DisplayMessage
        message={'Erro na solicitação.'}
        color="red"
        text="white"
      />
    )

  if (!item)
    return (
      <DisplayMessage message={'Consultando ...'} color="yellow" text="white" />
    )

  return (
    <div className="mt-6">
      <div className="mb-5 flex flex-1 items-center space-x-2">
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
        <TableRow>
          <TableCell isHeader>ID</TableCell>
          <TableCell isHeader>Usuário</TableCell>
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
        <TableRow key={item.id}>
          <TableCell>{item.id}</TableCell>
          <TableCell>{item.patient.name}</TableCell>
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
            {item.status === 'InProgress' ? 'Em andamento' : ''}
          </TableCell>
        </TableRow>
      </Table>
      <div className="flex justify-center mt-4">
        <div className="flex gap-3">
          <a href="#">&laquo;</a>
          <a href="#">1</a>
          <a href="#">2</a>
          <a href="#">3</a>
          <a href="#">4</a>
          <a href="#">&raquo;</a>
        </div>
      </div>
    </div>
  )
}
