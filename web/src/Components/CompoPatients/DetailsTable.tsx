import { useState, useEffect } from 'react'
import { CiSearch } from 'react-icons/ci'
import Input from '../Ux/Input/Input'
import DisplayMessage from '../Ux/DisplayMessage/DisplayMessage'
import Table from '../Ux/Table/Table'
import TableRow from '../Ux/Table/TableRow'
import {
  Status,
  TypeAppointment,
} from '../Hooks/Api/Appointments/TypeAppointments'
import { CardHeader } from '../Ux/Table/CardHeader'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { TbReportSearch } from 'react-icons/tb'
import { TableActions } from '../Ux/Table/TableActions'
import TableCell from '../Ux/Table/TableCell'
import { Pagination } from '../Ux/Table/Pagination '

interface DetailsTableProps {
  item: TypeAppointment[]
  isLoadingPoint: boolean
  isErrorPoint: boolean
}

export default function DetailsTable({
  item,
  isLoadingPoint,
  isErrorPoint,
}: DetailsTableProps) {
  const [expandedRows, setExpandedRows] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 5
  const statusTranslations: Record<Status, string> = {
    [Status.InProgress]: 'Em Progresso',
    [Status.Scheduled]: 'Agendado',
    [Status.Completed]: 'Concluído',
  }

  useEffect(() => {
    setTotalPages(Math.ceil(item.length / itemsPerPage))
  }, [item])

  const filteredItems = item.filter((appointment) =>
    appointment.specialty.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return
    setCurrentPage(newPage)
  }

  const toggleRow = (id: string) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    )
  }

  const handleSearchAppointment = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchTerm(event.target.value)
  }

  if (isLoadingPoint) {
    return <DisplayMessage message="Carregando" color="green" text="white" />
  }

  const headers = [
    'Exame',
    'Usuário',
    'Prioridade',
    'Solicitação',
    'Médico',
    'Status',
    'Detalhes',
  ]

  if (isErrorPoint) {
    return (
      <DisplayMessage message="Erro na solicitação." color="red" text="white" />
    )
  }

  if (item.length === 0) {
    return (
      <DisplayMessage
        message="Nenhum agendamento localizado"
        color="orange"
        text="black"
      />
    )
  }

  return (
    <div className="mt-6">
      {/* Container de Pesquisa */}
      <div className="mb-5 flex flex-col sm:flex-row items-center space-x-0 sm:space-x-2">
        <Input
          type="text"
          name="pesquisar"
          placeholder="Pesquisar por exame"
          value={searchTerm}
          onChange={handleSearchAppointment}
        />
        <button className="bg-blue-600 text-white hover:bg-blue-500 p-3 rounded mt-2 sm:mt-0">
          <CiSearch />
        </button>
      </div>

      {/* Tabela Responsiva */}
      <div className="overflow-x-auto">
        <Table>
          <div className="lg:hidden">
            <CardHeader headers={headers} />
          </div>
          <TableRow isHeader>
            <TableCell isHeader>Exame</TableCell>
            <TableCell isHeader>Usuário</TableCell>
            <TableCell isHeader>Prioridade</TableCell>
            <TableCell isHeader>Solicitação</TableCell>
            <TableCell isHeader>Médico</TableCell>
            <TableCell isHeader>Status</TableCell>
            <TableCell isHeader>Detalhes</TableCell>
          </TableRow>
          {paginatedItems.map((itemData) => (
            <div key={itemData.id}>
              {/* Mobile View */}
              <div
                className="lg:hidden border-b border-gray-200"
                onClick={() => toggleRow(itemData.id)}
              >
                <div className="flex items-center justify-between p-4 cursor-pointer">
                  <span className="font-medium text-gray-900">
                    {itemData.specialty.name} {/* Exame como principal */}
                  </span>
                  {expandedRows.includes(itemData.id) ? (
                    <FaChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <FaChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>

                {expandedRows.includes(itemData.id) && (
                  <div className="px-4 pb-4 space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Solicitação</p>
                      <p className="text-sm text-gray-900">
                        {new Date(itemData.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Médico</p>
                      <p className="text-sm text-gray-900">
                        {itemData.requestingDoctor}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="text-sm text-gray-900">{itemData.status}</p>
                    </div>

                    {/* Botão de Detalhes */}
                    <div className="mt-2">
                      <TableActions
                        id={itemData.id}
                        url={'details-request'}
                        icon={<TbReportSearch />}
                        color={'bg-blue-100 hover:bg-blue-300 text-blue-800'}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Desktop View */}
              <div className="hidden lg:block">
                <TableRow>
                  <TableCell>{itemData.specialty.name}</TableCell>
                  <TableCell>{itemData.user.name}</TableCell>
                  <TableCell>{itemData.priority}</TableCell>
                  <TableCell>
                    {itemData.createdAt &&
                      new Date(itemData.createdAt).toLocaleDateString('pt-BR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                  </TableCell>
                  <TableCell>{itemData.requestingDoctor}</TableCell>
                  <TableCell>
                    {statusTranslations[itemData.status] || itemData.status}
                  </TableCell>
                  <TableCell>
                    <TableActions
                      id={itemData.id}
                      url={'details-request'}
                      icon={<TbReportSearch />}
                      color={'bg-blue-100 hover:bg-blue-300 text-blue-800'}
                    />
                  </TableCell>
                </TableRow>
              </div>
            </div>
          ))}
        </Table>

        {/* Paginação */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}
