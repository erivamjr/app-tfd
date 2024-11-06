import { useEffect, useState } from 'react'

import { TbReportSearch } from 'react-icons/tb'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Alert from '../Ux/Alert/Alert'
import { CiSearch } from 'react-icons/ci'
import Input from '../Ux/Input/Input'
import usePatientsPage from '../Hooks/Api/Patiens/PatientsPage'
import usePatients from '../Hooks/Api/Patiens/Patients'
import { BiTrash } from 'react-icons/bi'
import { Pagination } from '../Ux/Table/Pagination '
import Table from '../Ux/Table/Table'
import { TableActions } from '../Ux/Table/TableActions'
import TableCell from '../Ux/Table/TableCell'
import TableRow from '../Ux/Table/TableRow'
import { Patient } from '../Hooks/Api/Patiens/TypePatiens'

export default function PatientsTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const [search, setSearch] = useState('')
  const { patients } = usePatients()
  const { patientsPage, isLoading, isError, totalPages } = usePatientsPage(
    currentPage,
    itemsPerPage,
  )
  const [searchPatients, setSearchPatients] = useState<Patient[]>([])

  useEffect(() => {
    setSearchPatients(patientsPage || [])
  }, [patientsPage])

  if (isLoading)
    return (
      <div>
        <Alert type={'success'} message={'Carregando...'} />
      </div>
    )
  if (isError)
    return (
      <div>
        <Alert type={'error'} message={'Erro na requisição!'} />
      </div>
    )
  if (!patientsPage || !Array.isArray(patientsPage))
    return (
      <div>
        <Alert type={'warning'} message={'Não é uma lista de array.!'} />
      </div>
    )

  function handleSearch() {
    const filtered = patients.filter((patient) =>
      patient.name.toLowerCase().includes(search.toLowerCase()),
    )
    setSearchPatients(filtered)
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
        <button onClick={handleBiTrash}>
          <BiTrash />
        </button>
        <button onClick={handleSearch}>
          <CiSearch />
        </button>
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
                <TableCell>{patient.user.name}</TableCell>
                <TableCell>
                  {patient.createdAt &&
                    new Date(patient.createdAt).toLocaleDateString('pt-BR', {
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
                      color={'bg-blue-500 hover:bg-blue-700'}
                      text={'white'}
                    />
                    <TableActions
                      id={patient.id}
                      url={'detalhespaciente'}
                      icon={<FaRegEdit />}
                      color={'bg-green-500 hover:bg-green-700'}
                      text={'white'}
                    />
                    <TableActions
                      id={patient.id}
                      url={'detalhespaciente'}
                      icon={<RiDeleteBin6Line />}
                      color={'bg-red-500 hover:bg-red-700'}
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
