import { useState } from 'react'

import { TbReportSearch } from 'react-icons/tb'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Alert from '../Ux/Alert/Alert'
import { CiSearch } from 'react-icons/ci'
import Input from '../Ux/Input/Input'
import usePatientsPage from '../Hooks/Api/Patiens/PatientsPage'

import { Pagination } from '../Ux/Table/Pagination '
import Table from '../Ux/Table/Table'
import { TableActions } from '../Ux/Table/TableActions'
import TableCell from '../Ux/Table/TableCell'
import TableRow from '../Ux/Table/TableRow'
import Modal from '../Ux/Modal/Modal'
import { Patient } from '../Hooks/Api/Patiens/TypePatiens'
import api from '../../Api'

export default function PatientsTable() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const [search, setSearch] = useState('')
  const [searchTherm, setSearchTherm] = useState('')
  const [patientDelete, setPatientDelete] = useState<Patient>()
  const { patientsPage, isLoading, isError, totalPages, setPatientsPage } =
    usePatientsPage(currentPage, itemsPerPage, searchTherm)

  function handleOpenModal(patient) {
    setIsModalOpen(true)
    setPatientDelete(patient)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
  }

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

  function handleSearch(event) {
    event.preventDefault()
    setSearchTherm(search)

    setCurrentPage(1)
  }

  async function handleDelete(id: string | undefined) {
    console.log(id)

    try {
      await api.delete(`/patients/${id}`)
      alert('DELETADO COM SUCESSO!')
      setIsModalOpen(false)
      setPatientsPage((prevPatients) =>
        prevPatients.filter((patient) => patient.id !== id),
      )
    } catch (err) {
      console.error('Delete patient fail!')
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="w-full flex items-center justify-center gap-2 mb-5"
      >
        <span className="w-full">
          <Input
            type="text"
            name="search"
            value={search}
            placeholder="Pesquisar"
            required={false}
            onChange={(e) => setSearch(e.target.value)}
          />
        </span>

        <button
          type="submit"
          className="flex gap-2 bg-blue-500 p-2 text-white rounded hover:bg-blue-700"
        >
          <CiSearch size={24} />
          <p>Buscar</p>
        </button>
      </form>

      <div className="w-[100%]  overflow-hidden">
        <Table>
          <TableRow>
            <TableCell isHeader>Nome</TableCell>
            <TableCell isHeader>CPF</TableCell>
            <TableCell isHeader>Telefone</TableCell>
            <TableCell isHeader>Usuário</TableCell>
            <TableCell isHeader>Data de Cadastro</TableCell>
            <TableCell isHeader>Configurações</TableCell>
          </TableRow>
          {patientsPage &&
            patientsPage.map((patient) => (
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
                      url={'edit-patient'}
                      icon={<FaRegEdit />}
                      color={'bg-green-500 hover:bg-green-700'}
                      text={'white'}
                    />
                    {/* <TableActions
                      id={patient.id}
                      url={'delete-patient'}
                      icon={<RiDeleteBin6Line />}
                      color={'bg-red-500 hover:bg-red-700'}
                      text={'white'}
                    /> */}

                    <button
                      className="text-white bg-red-500 hover:bg-red-700 flex gap-3 items-center justify-center text-2xl rounded p-3"
                      onClick={() => handleOpenModal(patient)}
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </Table>
        <div className=" mb-5 lg:bottom-5 ">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Deletar paciente"
        >
          <h1>
            Tem certeza que quer deletar paciente{' '}
            <span className="text-bold text-xl uppercase">
              {patientDelete?.name}
            </span>
          </h1>
          <button
            className="text-white bg-red-500 hover:bg-red-700 p-2 px-4 rounded mr-2"
            onClick={() => handleDelete(patientDelete?.id)}
          >
            <h1>Sim</h1>
          </button>

          <button
            className="text-white bg-green-500 hover:bg-green-700 p-2 px-4 rounded"
            onClick={() => setIsModalOpen(false)}
          >
            <h1>Não</h1>
          </button>
        </Modal>
      </div>
    </div>
  )
}
