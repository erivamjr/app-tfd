import React, { useState } from 'react'
import Table from '../Ux/table/Table'
import usePatients from '../Hooks/Api/Patiens/PatientsPage'
import { Pagination } from '../Ux/table/Pagination '
import { TableActions } from '../Ux/table/TableActions'
import TableCell from '../Ux/table/TableCell'
import TableRow from '../Ux/table/TableRow'
import { TbReportSearch } from 'react-icons/tb'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Alert from '../Ux/Alert/Alert'
import { CiSearch } from 'react-icons/ci'
import Input from '../Ux/Input/Input'
import usePatientsPage from '../Hooks/Api/Patiens/PatientsPage'

export default function PatientsTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 15
  const [search, setSearch] = useState('')

  const { patientsPage, isLoading, isError, totalPages } = usePatientsPage(
    currentPage,
    itemsPerPage,
  )
  if (isLoading)
    return (
      <div>
        <Alert color={'green'} text={'white'} message={'Carregando...'} />
      </div>
    )
  if (isError)
    return (
      <div>
        <Alert color={'red'} text={'white'} message={'Erro na requisição!'} />
      </div>
    )
  if (!patientsPage || !Array.isArray(patientsPage))
    return (
      <div>
        <Alert
          color={'green'}
          text={'white'}
          message={'Não é uma lista de array.!'}
        />
      </div>
    )

  return (
    <div>
      <div className="w-full flex items-center gap-2 mb-5">
        <span className="w-full">
          <Input
            type="text"
            name="search"
            placeholder="Pesquisar"
            onChange={(e) => setSearch(e.target.value)}
          />
        </span>
        <span className="bg-blue-600 text-white hover:bg-blue-500 p-3 rounded cursor-pointer">
          <CiSearch />
        </span>
      </div>
      <div className="w-[100%] h-[350px] sm:h-[500px] overflow-scroll">
        <Table>
          <TableRow>
            <TableCell isHeader>Nome</TableCell>
            <TableCell isHeader>CPF</TableCell>
            <TableCell isHeader>Telefone</TableCell>
            <TableCell isHeader>Usuário</TableCell>
            <TableCell isHeader>Data de Cadastro</TableCell>
            <TableCell isHeader>Configurações</TableCell>
          </TableRow>
          {patientsPage.map((patientPage) => (
            <TableRow key={patientPage.id}>
              <TableCell>{patientPage.name}</TableCell>
              <TableCell>{patientPage.cpf}</TableCell>
              <TableCell>{patientPage.phone}</TableCell>
              <TableCell>{patientPage.usuario}</TableCell>
              <TableCell>
                {new Date(patientPage.createdAt).toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </TableCell>
              <TableCell>
                <div className="flex justify-between items-center w-full">
                  <TableActions
                    id={patientPage.id}
                    url={'detalhespaciente'}
                    icon={<TbReportSearch />}
                    color={'yellow'}
                    text={'white'}
                  />
                  <TableActions
                    id={patientPage.id}
                    url={'detalhespaciente'}
                    icon={<FaRegEdit />}
                    color={'green'}
                    text={'white'}
                  />
                  <TableActions
                    id={patientPage.id}
                    url={'detalhespaciente'}
                    icon={<RiDeleteBin6Line />}
                    color={'red'}
                    text={'white'}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </Table>
        <div className=" mb-5 lg:absolute lg:bottom-5 ">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  )
}
