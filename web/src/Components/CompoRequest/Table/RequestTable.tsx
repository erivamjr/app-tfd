import React from 'react'
import Table from '../../Ux/table/Table'
import { Pagination } from '../../Ux/table/Pagination '
import { TableActions } from '../../Ux/table/TableActions'
import TableCell from '../../Ux/table/TableCell'
import TableRow from '../../Ux/table/TableRow'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { TbReportSearch } from 'react-icons/tb'
import useAppointment from '../../Hooks/Api/Appointments/Appointments'

export default function RequestTable() {
  const { appointments, isLoading, isError } = useAppointment()
  console.log(appointments)
  return (
    <Table>
      <TableRow>
        <TableCell isHeader>Nome</TableCell>
        <TableCell isHeader>CPF</TableCell>
        <TableCell isHeader>Telefone</TableCell>
        <TableCell isHeader>Usuario</TableCell>
        <TableCell isHeader>Data de Cadastro</TableCell>
        <TableCell isHeader>Configurações</TableCell>
      </TableRow>
      {appointments.map((user) => (
        <TableRow key={user.id}>
          <TableCell>{user.patient.name}</TableCell>
          <TableCell>{user.patient.cpf}</TableCell>
          <TableCell>{user.patient.phone}</TableCell>
          <TableCell>{user.patient.userId}</TableCell>
          <TableCell>
            {new Date(user.createdAt).toLocaleDateString('pt-BR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </TableCell>
          <TableCell>
            <div className="flex justify-between items-center w-full">
              <TableActions
                id={user.id}
                url={'detalhessolicitacao'}
                icon={<TbReportSearch />}
                color={'yellow'}
                text={'white'}
              />
              <TableActions
                id={user.id}
                url={'editarsolicitacao'}
                icon={<FaRegEdit />}
                color={'green'}
                text={'white'}
              />
              <TableActions
                id={user.id}
                url={'excluir'}
                icon={<RiDeleteBin6Line />}
                color={'red'}
                text={'white'}
              />
            </div>
          </TableCell>
        </TableRow>
      ))}
      <Pagination />
    </Table>
  )
}
