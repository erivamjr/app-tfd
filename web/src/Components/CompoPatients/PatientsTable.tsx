import { useState } from 'react'
import { TbReportSearch } from 'react-icons/tb'
import { FaChevronDown, FaChevronUp, FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin6Line, RiUserAddLine } from 'react-icons/ri'

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
import { CardHeader } from '../Ux/Table/CardHeader'
import { ButtonAction } from '../Ux/ButtonActionProps'
import { Link } from 'react-router-dom'
import { IoMdClose } from 'react-icons/io'

export default function PatientsTable() {
  const [expandedRows, setExpandedRows] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const [search, setSearch] = useState('')
  const [searchTherm, setSearchTherm] = useState('')
  const [patientDelete, setPatientDelete] = useState<Patient>()
  const { patientsPage, isLoading, isError, totalPages, setPatientsPage } =
    usePatientsPage(currentPage, itemsPerPage, searchTherm)
  const headers = [
    'Nome',
    'CPF',
    'Telefone',
    'Usuário',
    'Data de Cadastro',
    'Configurações',
  ]

  const toggleRow = (id: string) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    )
  }

  function handleOpenModal(patient) {
    setIsModalOpen(true)
    setPatientDelete(patient)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
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
      <Link to="/patients/add-patient" className="flex justify-end mb-4">
        <div className="ml-10 bg-blue-500 text-white hover:bg-blue-700 p-2 rounded flex items-center gap-2 cursor-pointer">
          <RiUserAddLine size={24} />

          <span className="hidden md:block">Adicionar Paciente</span>
        </div>
      </Link>
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
          <p className="hidden md:block">Buscar</p>
        </button>
      </form>

      <div className="w-[100%] overflow-hidden">
        <Table>
          <div className="lg:hidden">
            <CardHeader headers={headers} />
          </div>
          <TableRow isHeader>
            <TableCell isHeader>Nome</TableCell>
            <TableCell isHeader>CPF</TableCell>
            <TableCell isHeader>Telefone</TableCell>
            <TableCell isHeader>Usuário</TableCell>
            <TableCell isHeader>Data de Cadastro</TableCell>
            <TableCell isHeader>Configurações</TableCell>
          </TableRow>
          {patientsPage &&
            patientsPage.map((patient) => (
              <div key={patient.id}>
                {/* Mobile View */}
                <div
                  className="lg:hidden border-b border-gray-200"
                  onClick={() => toggleRow(patient.id)}
                >
                  <div className="flex items-center justify-between p-4 cursor-pointer">
                    <span className="font-medium text-gray-900">
                      {patient.name}
                    </span>
                    {expandedRows.includes(patient.id) ? (
                      <FaChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <FaChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>

                  {expandedRows.includes(patient.id) && (
                    <div className="px-4 pb-4 space-y-4">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">CPF</p>
                        <p className="text-sm text-gray-900">{patient.cpf}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Telefone</p>
                        <p className="text-sm text-gray-900">{patient.phone}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Usuário</p>
                        <p className="text-sm text-gray-900">
                          {patient.user.name}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">
                          Data de Cadastro
                        </p>
                        <p className="text-sm text-gray-900">
                          {patient.createdAt &&
                            new Date(patient.createdAt).toLocaleDateString(
                              'pt-BR',
                              {
                                day: '2-digit',
                                month: '2-digit',
                                year: '2-digit',
                              },
                            )}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Ações</p>
                        <div className="flex gap-2 mt-2">
                          <TableActions
                            id={patient.id}
                            url={'details-patient'}
                            icon={<TbReportSearch />}
                            color={
                              'bg-blue-100 hover:bg-blue-300 text-blue-800'
                            }
                          />
                          <TableActions
                            id={patient.id}
                            url={'edit-patient'}
                            icon={<FaRegEdit />}
                            color={
                              'bg-green-100 hover:bg-green-300 text-green-800'
                            }
                          />
                          <ButtonAction
                            icon={<RiDeleteBin6Line />}
                            color={'bg-red-100 hover:bg-red-300'}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleOpenModal(patient)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Desktop View */}
                <div className="hidden lg:block">
                  <TableRow>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.cpf}</TableCell>
                    <TableCell>{patient.phone}</TableCell>
                    <TableCell>{patient.user.name}</TableCell>
                    <TableCell>
                      {patient.createdAt &&
                        new Date(patient.createdAt).toLocaleDateString(
                          'pt-BR',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          },
                        )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 mt-2">
                        <TableActions
                          id={patient.id}
                          url={'details-patient'}
                          icon={<TbReportSearch />}
                          color={'bg-blue-100 hover:bg-blue-300 text-blue-800'}
                        />
                        <TableActions
                          id={patient.id}
                          url={'edit-patient'}
                          icon={<FaRegEdit />}
                          color={
                            'bg-green-100 hover:bg-green-300 text-green-800'
                          }
                        />
                        <ButtonAction
                          icon={<RiDeleteBin6Line />}
                          color={'bg-red-100 hover:bg-red-300'}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleOpenModal(patient)
                          }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                </div>
              </div>
            ))}
        </Table>
        <div className=" mb-5 lg:bottom-5 ">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Deletar Paciente"
        >
          <div className="space-y-4">
            <h1 className="text-xl font-semibold text-gray-800">
              Tem certeza que deseja deletar o paciente{' '}
              <span className="text-lg font-bold text-gray-900">
                {patientDelete?.name}
              </span>
              ?
            </h1>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Esta ação é irreversível. O paciente será removido
                permanentemente do sistema.
              </p>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => handleDelete(patientDelete?.id)}
                className="text-white bg-red-600 hover:bg-red-700 px-6 py-3 rounded-md text-lg font-medium transition-all duration-300 flex items-center gap-2"
              >
                <IoMdClose size={20} />
                Sim, deletar
              </button>

              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-800 bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-md text-lg font-medium transition-all duration-300"
              >
                Não, cancelar
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}
