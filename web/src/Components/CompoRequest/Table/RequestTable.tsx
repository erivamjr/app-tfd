import { ChangeEvent, useContext, useEffect, useMemo, useState } from 'react'
import { TbReportSearch } from 'react-icons/tb'
import {
  FaChevronDown,
  FaChevronUp,
  FaRegEdit,
  FaWhatsapp,
} from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { CiSearch } from 'react-icons/ci'
import Input from '../../Ux/Input/Input'
import Table from '../../Ux/Table/Table'
import { TableActions } from '../../Ux/Table/TableActions'
import TableCell from '../../Ux/Table/TableCell'
import TableRow from '../../Ux/Table/TableRow'
import { Pagination } from '../../Ux/Table/Pagination '
import Modal from '../../Ux/Modal/Modal'
import { TypeAppointment } from '../../Hooks/Api/Appointments/TypeAppointments'
import api from '../../../Api'
import { ButtonAction } from '../../Ux/ButtonActionProps'
import { IoReturnDownBack } from 'react-icons/io5'
import { TfiAgenda } from 'react-icons/tfi'
import { Link } from 'react-router-dom'
import { useAppointmentsPage } from '../../Hooks/Api/Appointments/AppointmentsPage'
import Alert from '../../Ux/Alert/Alert'
import { DataContext } from '../../Context/DataContext'
import { debounce } from 'lodash'
import { SelectReact } from '../../Ux/Input/SelectReact'
import WhatsAppModal from '../../Ux/Modal/WhatsappModal'

export default function RequestTable() {
  const [expandedRows, setExpandedRows] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isModalWhatsappOpen, setIsModalWhatsappOpen] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [searchValue, setSearchValue] = useState('')
  const [appointmentsModal, setAppointmentsModal] = useState<TypeAppointment>()
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedPriority, setSelectedPriority] = useState('')
  const [isPregnant, setIsPregnant] = useState(false)
  const [hasHypertension, setHasHypertension] = useState(false)
  const [hasDiabetes, setHasDiabetes] = useState(false)
  const [isBedridden, setIsBedridden] = useState(false)
  const [hasCourtOrder, setHasCourtOrder] = useState(false)
  const [isSuspected, setIsSuspected] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const filters = useMemo(
    () => ({
      specialty: selectedSpecialty || undefined,
      status: selectedStatus || undefined,
      priority: selectedPriority || undefined,
      isPregnant: isPregnant || undefined,
      hasHypertension: hasHypertension || undefined,
      hasDiabetes: hasDiabetes || undefined,
      isBedridden: isBedridden || undefined,
      hasCourtOrder: hasCourtOrder || undefined,
      isSuspected: isSuspected || undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      search: searchValue || undefined,
    }),
    [
      selectedSpecialty,
      selectedStatus,
      selectedPriority,
      isPregnant,
      hasHypertension,
      hasDiabetes,
      isBedridden,
      hasCourtOrder,
      isSuspected,
      startDate,
      endDate,
      searchValue,
    ],
  )

  const [debouncedFilters, setDebouncedFilters] = useState(filters)

  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedFilters(filters)
    }, 500) // Aguarda 500ms antes de atualizar os filtros

    handler()
    return () => handler.cancel()
  }, [filters])

  const {
    appointmentsPage = [],
    isLoading,
    isError,
    totalPages,
    setAppointmentsPage,
  } = useAppointmentsPage(currentPage, itemsPerPage, debouncedFilters)

  const { specialties } = useContext(DataContext)

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

  const toggleRow = (id: string) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    )
  }

  function handleOpenModal(appintments) {
    setIsModalOpen(true)
    setAppointmentsModal(appintments)
  }

  function handleOpenModalWhatsapp(appintments) {
    setIsModalWhatsappOpen(true)
    setAppointmentsModal(appintments)
  }
  async function handleDelete(id: string | undefined) {
    try {
      await api.delete(`/appointments/${id}`)
      alert('DELETADO COM SUCESSO!')
      setIsModalOpen(false)
      setAppointmentsPage((prevAppointments) =>
        prevAppointments.filter((patient) => patient.id !== id),
      )
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
    ...new Set(specialties.map((specialty) => specialty.name)),
  ].map((name) => ({
    value: name,
    label: name,
  }))

  const handleStatusChange = (selectedOption) => {
    setSelectedStatus(selectedOption ? selectedOption.value : '')
  }

  const statusOptions = [
    { value: 'InProgress', label: 'Em Andamento' },
    { value: 'Scheduled', label: 'Agendado' },
    { value: 'Completed', label: 'Completado' },
  ]

  const handlePriorityChange = (selectedOption) => {
    setSelectedPriority(selectedOption ? selectedOption.value : '')
  }

  const priorityOptions = [
    { value: 'Emergency', label: 'Emergência' },
    { value: 'Elderly', label: 'Idoso' },
    { value: 'Pregnant', label: 'Gestante' },
    { value: 'Normal', label: 'Normal' },
    { value: 'Child', label: 'Criança' },
  ]

  const handlePageChange = (page: number) => {
    console.log('handlePageChange', page)

    setCurrentPage(page)
  }

  const priorityEmojis = {
    Emergency: '🔴', // 🔴 🚑 ⚡ 🆘
    Elderly: '🟡', // 🟡 👴 👵 🦽
    Pregnant: '🟠', // 🟠 🤰 🍼 🤱
    Normal: '🟢', // 🟢 ✅ 🆗 😊
    Child: '🟠', // 🟠 👶 🧒 🏥
  }

  const conditionEmojis = {
    isPregnant: '🤰🏼', // gestante '👶' (Bebê), '🍼' (Mamadeira)
    hasHypertension: '💓', // hipertençao  '🫀' (Coração), '❤️‍🔥' (Batimentos)
    hasDiabetes: '🍬', // diabetes '🩸' (Gota de sangue), '🥤' (Refrigerante)
    isBedridden: '🛏️', // acamado '🏥' (Hospital), '🤕' (Rosto machucado)
    hasCourtOrder: '⚖️', // processo judicial '📜' (Documento), '🏛️' (Tribunal)
    isSuspected: '🕵🏻‍♂', // suspeita '🤔' (Pensativo), '🚨' (Alerta)
  }

  const getConditionEmojis = (appointment) => {
    return Object.entries(conditionEmojis)
      .filter(([key]) => appointment[key]) // Filtra apenas as condições que são `true`
      .map(([, emoji]) => emoji) // Pega apenas os emojis
      .join(' ') // Junta os emojis em uma string
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Link to="/request/add-request" className="flex justify-end mb-4">
          <div className="ml-10 bg-blue-500 text-white hover:bg-blue-700 p-2 rounded flex items-center gap-2 cursor-pointer">
            <TfiAgenda size={24} />

            <span className="hidden sm:block">Adicionar Solicitação</span>
          </div>
        </Link>
      </div>
      {/* Grid para os selects */}
      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Especialidades
          </label>
          <SelectReact
            placeholder="Selecione"
            options={specialtyOptions}
            selected={selectedSpecialty}
            handleChange={handleSpecialtyChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <SelectReact
            placeholder="Selecione"
            options={statusOptions}
            selected={selectedStatus}
            handleChange={handleStatusChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Prioridade
          </label>
          <SelectReact
            placeholder="Selecione"
            options={priorityOptions}
            selected={selectedPriority}
            handleChange={handlePriorityChange}
          />
        </div>
      </div>

      {/* Filtros booleanos */}
      <div className="grid sm:grid-cols-6 gap-4 mb-4 bg-gray-100 p-4 rounded-lg">
        {[
          { label: 'Gestante', state: isPregnant, setState: setIsPregnant },
          {
            label: 'Hipertensão',
            state: hasHypertension,
            setState: setHasHypertension,
          },
          { label: 'Diabetes', state: hasDiabetes, setState: setHasDiabetes },
          { label: 'Acamado', state: isBedridden, setState: setIsBedridden },
          {
            label: 'Ordem Judicial',
            state: hasCourtOrder,
            setState: setHasCourtOrder,
          },
          { label: 'Suspeito', state: isSuspected, setState: setIsSuspected },
        ].map((checkbox, index) => (
          <label key={index} className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={checkbox.state}
              onChange={(e) => checkbox.setState(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded"
            />
            <span>{checkbox.label}</span>
          </label>
        ))}
      </div>

      {/* Filtros de data */}
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Data Início
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded p-2 w-full shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Data Fim
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded p-2 w-full shadow-sm"
          />
        </div>
      </div>

      {/* Botão de pesquisa */}
      <div className="flex  mb-2 items-center space-x-2">
        <div className=" rounded flex-1 shadow-sm">
          <Input
            type="text"
            name="pesquisar"
            placeholder="Pesquisar"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 flex items-center gap-2">
          <CiSearch size={24} />
          <p className="hidden md:block">Buscar</p>
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
        {appointmentsPage.map((appointment) => (
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
                  <span>
                    {priorityEmojis[appointment.priority] || ''}
                    {getConditionEmojis(appointment)}
                  </span>
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
                      {appointment.patient.phone && (
                        <button
                          className="flex items-center justify-center p-2 min-w-[50px] border rounded-md transition-all duration-200 hover:scale-105 bg-green-400 hover:bg-green-500 text-white"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleOpenModalWhatsapp(appointment)
                          }}
                        >
                          <FaWhatsapp size={24} />
                        </button>
                      )}
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
                  {getConditionEmojis(appointment)}
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
                    {appointment.patient.phone && (
                      <button
                        className="flex items-center justify-center p-2 min-w-[50px] border rounded-md transition-all duration-200 hover:scale-105 bg-green-400 hover:bg-green-500 text-white"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOpenModalWhatsapp(appointment)
                        }}
                      >
                        <FaWhatsapp size={24} />
                      </button>
                    )}
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
              {appointmentsModal?.specialty.name}
            </span>{' '}
            de{' '}
            <span className="font-bold text-xl text-gray-900">
              {appointmentsModal?.patient.name}
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
              onClick={() => handleDelete(appointmentsModal?.id)}
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
      {appointmentsModal && (
        <WhatsAppModal
          isOpen={isModalWhatsappOpen}
          onClose={() => setIsModalWhatsappOpen(false)}
          appointment={appointmentsModal}
        />
      )}
    </div>
  )
}
