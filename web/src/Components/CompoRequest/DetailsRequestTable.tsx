import React from 'react'
import DisplayMessage from '../Ux/DisplayMessage/DisplayMessage'
import { Pagination } from '../Ux/table/Pagination '
import Table from '../Ux/table/Table'
import TableCell from '../Ux/table/TableCell'
import TableRow from '../Ux/table/TableRow'

interface DetailsTableProps {
  item: any
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
        <TableCell>{item.status === 'InProgress' && 'Em andamento'}</TableCell>
      </TableRow>
      <Pagination />
    </Table>
  )
}
