import { ChangeEvent, useState } from 'react'
import { TbReportSearch } from 'react-icons/tb'
import { FaChevronDown, FaChevronUp, FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import useAppointment from '../../Hooks/Api/Appointments/Appointments'
import { CiSearch } from 'react-icons/ci'
import Input from '../../Ux/Input/Input'
import Table from '../../Ux/Table/Table'
import { TableActions } from '../../Ux/Table/TableActions'
import TableCell from '../../Ux/Table/TableCell'
import TableRow from '../../Ux/Table/TableRow'
import { Pagination } from '../../Ux/Table/Pagination '
import Modal from '../../Ux/Modal/Modal'
import { TypeAppointment } from '../../Hooks/Api/Appointments/TypeAppointments'
import CreatableSelect from 'react-select/creatable'
import api from '../../../Api'
import { ButtonAction } from '../../Ux/ButtonActionProps'
import { IoReturnDownBack } from 'react-icons/io5'
import { TfiAgenda } from 'react-icons/tfi'
import { Link } from 'react-router-dom'

export default function RequestTable() {
  const [expandedRows, setExpandedRows] = useState<string[]>([])
  const { appointments } = useAppointment()
  const [searchValue, setSearchValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const totalPages = Math.ceil((appointments?.length || 0) / itemsPerPage)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [appointmentsDelete, setAppointmentsDelete] =
    useState<TypeAppointment>()
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedPriority, setSelectedPriority] = useState('')

  const toggleRow = (id: string) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    )
  }

  const filteredAppointments = appointments.filter((appointment) => {
    return (
      (!selectedSpecialty ||
        appointment.specialty.name === selectedSpecialty) &&
      (!selectedStatus || appointment.status === selectedStatus) &&
      (!selectedPriority || appointment.priority === selectedPriority)
    )
  })

  function handleOpenModal(appintments) {
    setIsModalOpen(true)
    setAppointmentsDelete(appintments)
  }

  async function handleDelete(id: string | undefined) {
    try {
      await api.delete(`/patients/${id}`)
      alert('DELETADO COM SUCESSO!')
      setIsModalOpen(false)
    } catch (err) {
      console.error('Delete patient fail!')
    }
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
    // Se você tiver uma lógica de pesquisa, coloque-a aqui
  }

  const handleSpecialtyChange = (selectedOption) => {
    setSelectedSpecialty(selectedOption ? selectedOption.value : '')
  }

  const specialtyOptions = [
    ...new Set(appointments.map((appointment) => appointment.specialty.name)),
  ].map((name) => ({
    value: name,
    label: name,
  }))

  const compareDates = (a: TypeAppointment, b: TypeAppointment) => {
    const dateA = new Date(a.createdAt).getTime() // Converte para timestamp
    const dateB = new Date(b.createdAt).getTime() // Converte para timestamp
    return dateA - dateB // Comparação numérica para ordenação decrescente
  }

  const displayAppointments = () => {
    if (!filteredAppointments) return []

    const sortedAppointments = filteredAppointments.slice().sort(compareDates)

    const searchLower = searchValue.toLowerCase()
    const searchedAppointments = sortedAppointments.filter((appointment) => {
      return appointment.patient.name.toLowerCase().includes(searchLower)
    })

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = Math.min(
      startIndex + itemsPerPage,
      searchedAppointments.length,
    )
    return searchedAppointments.slice(startIndex, endIndex)
  }

  // Event listener para mudar de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const priorityTranslations = {
    Emergency: 'Emergência',
    Elderly: 'Idoso',
    Pregnant: 'Gestante',
    Normal: 'Normal',
    Child: 'Criança',
  }

  const statusTranslations = {
    InProgress: 'Em Andamento',
    Scheduled: 'Agendado',
    Completed: 'Completado',
  }

  const priorityEmojis = {
    Emergency: '🔴',
    Elderly: '🟡',
    Pregnant: '🟠',
    Normal: '🟢',
    Child: '🟠',
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Link to="/request/add-request" className="flex justify-end mb-4">
          <div className="ml-10 bg-blue-500 text-white hover:bg-blue-700 p-2 rounded flex items-center gap-2 cursor-pointer">
            <TfiAgenda />

            <span className="hidden sm:block">Adicionar Solicitação</span>
          </div>
        </Link>
      </div>
      <div className="mb-5 grid sm:grid-cols-4 grid-cols-1 gap-4">
        <CreatableSelect
          placeholder="Todas Especialidades"
          isClearable
          options={specialtyOptions}
          value={
            selectedSpecialty
              ? { value: selectedSpecialty, label: selectedSpecialty }
              : null
          }
          onChange={handleSpecialtyChange}
          styles={{
            control: (provided, state) => ({
              ...provided,
              borderColor: state.isFocused ? '#121212' : '#d9d9d9',
              boxShadow: state.isFocused ? '0 0 0 1px #121212' : 'none',
              '&:hover': {
                borderColor: '#121212',
              },
            }),
            menu: (base) => ({
              ...base,
              marginTop: '0.5rem',
              borderRadius: '0.25rem',
              boxShadow:
                '0 0 0 1px rgba(0, 0, 0, 0.05), 0 4px 11px rgba(0, 0, 0, 0.1)',
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isSelected ? '#e0e0e0' : 'white',
              ':hover': {
                backgroundColor: '#f0f0f0',
              },
            }),
          }}
        />

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border rounded p-2 mr-2"
        >
          <option value="">Todos os status</option>
          {appointments
            .map((appointment) => appointment.status)
            .filter(
              (status, index, statuses) => statuses.indexOf(status) === index,
            )
            .map((status) => (
              <option key={status} value={status}>
                {statusTranslations[status] || status}
              </option>
            ))}
        </select>

        <select
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
          className="border rounded p-2 mr-2"
        >
          <option value="">Todas as prioridades</option>
          {appointments
            .map((appointment) => appointment.priority)
            .filter(
              (priority, index, priorities) =>
                priorities.indexOf(priority) === index,
            )
            .map((priority) => (
              <option key={priority} value={priority}>
                {priorityTranslations[priority] || priority}
              </option>
            ))}
        </select>
      </div>
      <div className="mb-5 flex flex-1 items-center space-x-2">
        <Input
          type="text"
          name="pesquisar"
          placeholder="Pesquisar"
          value={searchValue}
          onChange={handleSearchChange}
        />
        <button className="flex gap-2 bg-blue-500 p-2 text-white rounded hover:bg-blue-700">
          <CiSearch size={24} />
          <p>Buscar</p>
        </button>
      </div>
      <Table>
        <TableRow isHeader>
          <TableCell isHeader>Nome</TableCell>
          <TableCell isHeader>P</TableCell>
          <TableCell isHeader>CPF</TableCell>
          <TableCell isHeader>Telefone</TableCell>
          <TableCell isHeader>Especialidade</TableCell>
          <TableCell isHeader>Data de Cadastro</TableCell>
          <TableCell isHeader>Configurações</TableCell>
        </TableRow>
        {displayAppointments().map((appointment) => (
          <div key={appointment.id}>
            {/* Mobile View */}
            <div
              className="lg:hidden border-b border-gray-200"
              onClick={() => toggleRow(appointment.id)}
            >
              <div className="flex items-center justify-between p-4 cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">
                    {appointment.patient.name}
                  </span>
                  <span>{priorityEmojis[appointment.priority] || ''}</span>
                </div>
                {expandedRows.includes(appointment.id) ? (
                  <FaChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <FaChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </div>

              {expandedRows.includes(appointment.id) && (
                <div className="px-4 pb-4 space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">CPF</p>
                    <p className="text-sm text-gray-900">
                      {appointment.patient.cpf}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Telefone</p>
                    <p className="text-sm text-gray-900">
                      {appointment.patient.phone}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Especialidade</p>
                    <p className="text-sm text-gray-900">
                      {appointment.specialty.name}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Data de Cadastro</p>
                    <p className="text-sm text-gray-900">
                      {new Date(appointment.createdAt).toLocaleDateString(
                        'pt-BR',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        },
                      )}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Ações</p>
                    <div className="flex gap-2 mt-2">
                      <TableActions
                        id={appointment.id}
                        url={'details-request'}
                        icon={<TbReportSearch />}
                        color={'bg-blue-100 hover:bg-blue-300 text-blue-800'}
                      />
                      <TableActions
                        id={appointment.id}
                        url={'edit-request'}
                        icon={<FaRegEdit />}
                        color={'bg-green-100 hover:bg-green-300 text-green-800'}
                        text={'white'}
                      />
                      <ButtonAction
                        icon={<RiDeleteBin6Line />}
                        color={'bg-red-100 hover:bg-red-300 text-red-800'}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOpenModal(appointment)
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
                <TableCell>{appointment.patient.name}</TableCell>
                <TableCell>
                  {priorityEmojis[appointment.priority] || ''}
                </TableCell>
                <TableCell>{appointment.patient.cpf}</TableCell>
                <TableCell>{appointment.patient.phone}</TableCell>
                <TableCell>{appointment.specialty.name}</TableCell>
                <TableCell>
                  {new Date(appointment.createdAt).toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 mt-2">
                    <TableActions
                      id={appointment.id}
                      url={'details-request'}
                      icon={<TbReportSearch />}
                      color={'bg-blue-100 hover:bg-blue-300 text-blue-800'}
                    />
                    <TableActions
                      id={appointment.id}
                      url={'edit-request'}
                      icon={<FaRegEdit />}
                      color={'bg-green-100 hover:bg-green-300 text-green-800'}
                      text={'white'}
                    />
                    <ButtonAction
                      icon={<RiDeleteBin6Line />}
                      color={'bg-red-100 hover:bg-red-300 text-red-800'}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOpenModal(appointment)
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            </div>
          </div>
        ))}
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Deletar Solicitação"
      >
        <div className="space-y-4">
          <h1 className="text-lg font-semibold text-gray-800">
            Tem certeza que deseja deletar a solicitação para{' '}
            <span className="font-bold text-xl text-gray-900">
              {appointmentsDelete?.specialty.name}
            </span>{' '}
            de{' '}
            <span className="font-bold text-xl text-gray-900">
              {appointmentsDelete?.patient.name}
            </span>
            ?
          </h1>
          <p className="text-sm text-gray-600">
            Esta ação não pode ser desfeita. O paciente será removido
            permanentemente da lista de solicitações.
          </p>
          <div className="flex justify-end gap-4 mt-6">
            {/* Botão de Deletar */}
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium flex items-center gap-2 transition-all duration-300"
              onClick={() => handleDelete(appointmentsDelete?.id)}
            >
              <RiDeleteBin6Line size={20} /> {/* Ícone de lixeira */}
              Sim, Deletar
            </button>

            {/* Botão de Cancelar */}
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md font-medium flex items-center gap-2 transition-all duration-300"
              onClick={() => setIsModalOpen(false)}
            >
              <IoReturnDownBack size={20} /> {/* Ícone de voltar */}
              Não, Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
