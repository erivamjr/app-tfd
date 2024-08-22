import React, { useEffect, useState } from 'react'
import Table from '../Ux/table/Table'
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
import Button from '../Ux/Button/Button'
import usePatients from '../Hooks/Api/Patiens/Patients'
import { BiTrash } from 'react-icons/bi'

export default function PatientsTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const [search, setSearch] = useState('')
  const { patients } = usePatients()
  const { patientsPage, isLoading, isError, totalPages } = usePatientsPage(
    currentPage,
    itemsPerPage,
  )
  const [searchPatients, setSearchPatients] = useState('')

  useEffect(() => {
    setSearchPatients(patientsPage || [])
  }, [patientsPage])

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

  function handleSearch() {
    const filtered = patients.filter((patient) =>
      patient.name.toLowerCase().includes(search.toLowerCase()),
    )
    setSearchPatients(filtered as any)
    setCurrentPage(1)
  }
  function handleBiTrash() {
    setSearchPatients(patientsPage)
    setCurrentPage(1)
    setSearch('')
  }
  return (
    <div>
      <div className="w-full flex items-center justify-center gap-2 mb-5">
        <span className="w-full">
          <Input
            type="text"
            name="search"
            value={search}
            placeholder="Pesquisar"
            onChange={(e) => setSearch(e.target.value)}
            list="patients-list"
          />
          <datalist id="patients-list">
            {patients.map((patient) => (
              <option key={patient.id} value={patient.name} />
            ))}
          </datalist>
        </span>
        <Button
          onClick={handleBiTrash}
          icon={<BiTrash />}
          backgroundColor={'blue'}
        />
        <Button
          onClick={handleSearch}
          icon={<CiSearch />}
          backgroundColor={'blue'}
        />
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
          {searchPatients &&
            searchPatients.map((patient) => (
              <TableRow key={patient.id}>
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
