import React from 'react'
import Table from '../Ux/table/Table'
import usePatients from '../Hooks/Api/Patiens/Patiens'
import { Pagination } from '../Ux/table/Pagination '
import { TableActions } from '../Ux/table/TableActions'
import TableCell from '../Ux/table/TableCell'
import TableRow from '../Ux/table/TableRow'
import { TbReportSearch } from 'react-icons/tb'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'

export default function PatientsTable() {
  const { patients, isLoading, isError } = usePatients()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Erro na requisição!</div>
  if (!patients || !Array.isArray(patients))
    return <div>Não é uma lista de array.</div>

  return (
    <Table>
      <TableRow>
        <TableCell isHeader>ID</TableCell>
        <TableCell isHeader>Nome</TableCell>
        <TableCell isHeader>CPF</TableCell>
        <TableCell isHeader>Telefone</TableCell>
        <TableCell isHeader>Usuário</TableCell>
        <TableCell isHeader>Data de Cadastro</TableCell>
        <TableCell isHeader>Configurações</TableCell>
      </TableRow>
      {patients.map((patient) => (
        <TableRow key={patient.id}>
          <TableCell>{patient.id}</TableCell>
          <TableCell>{patient.name}</TableCell>
          <TableCell>{patient.cpf}</TableCell>
          <TableCell>{patient.phone}</TableCell>
          <TableCell>{patient.usuario}</TableCell>
          <TableCell>
            {new Date(patient.createdAt).toLocaleDateString('pt-BR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </TableCell>
          <TableCell>
            <div className="flex justify-between items-center w-full">
              <TableActions
                id={patient.id}
                url={'detalhespaciente'}
                icon={<TbReportSearch />}
                color={'yellow'}
                text={'white'}
              />
              <TableActions
                id={patient.id}
                url={'detalhespaciente'}
                icon={<FaRegEdit />}
                color={'green'}
                text={'white'}
              />
              <TableActions
                id={patient.id}
                url={'detalhespaciente'}
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
