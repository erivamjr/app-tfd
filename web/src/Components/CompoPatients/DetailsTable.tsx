import { CiSearch } from 'react-icons/ci'
import Input from '../Ux/Input/Input'
import DisplayMessage from '../Ux/DisplayMessage/DisplayMessage'
import Table from '../Ux/Table/Table'
import TableRow from '../Ux/Table/TableRow'
import TableCell from '../Ux/Table/TableCell'
import { TypeAppointment } from '../Hooks/Api/Appointments/TypeAppointments'
import { CardHeader } from '../Ux/Table/CardHeader'

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
  if (isLoadingPoint) {
    return <DisplayMessage message="Carregando" color="green" text="white" />
  }

  const headers = [
    'Usuário',
    'Prioridade',
    'Diagnóstico',
    'Exame',
    'Solicitação',
    'CID',
    'Médico',
    'CRM',
    'Agendamento',
    'Status',
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
          placeholder="Pesquisar"
          value=""
          onChange={() => {}}
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
            <TableCell isHeader>Usuário</TableCell>
            <TableCell isHeader>Prioridade</TableCell>
            <TableCell isHeader>Diagnóstico</TableCell>
            <TableCell isHeader>Exame</TableCell>
            <TableCell isHeader>Solicitação</TableCell>
            <TableCell isHeader>CID</TableCell>
            <TableCell isHeader>Médico</TableCell>
            <TableCell isHeader>CRM</TableCell>
            <TableCell isHeader>Agendamento</TableCell>
            <TableCell isHeader>Status</TableCell>
          </TableRow>
          {item.map((itemData) => (
            <TableRow key={itemData.id}>
              <TableCell>{itemData.user.name}</TableCell>
              <TableCell>{itemData.priority}</TableCell>
              <TableCell>{itemData.diagnosis}</TableCell>
              <TableCell>{itemData.specialty.name}</TableCell>
              <TableCell>
                {new Date(itemData.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>{itemData.cid}</TableCell>
              <TableCell>{itemData.requestingDoctor}</TableCell>
              <TableCell>{itemData.crm}</TableCell>
              <TableCell>
                {new Date(itemData.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>{itemData.status}</TableCell>
            </TableRow>
          ))}
        </Table>
      </div>

      {/* Seção de Paginação */}
      <div className="flex self-start justify-center mt-4">
        <div className="flex gap-3">
          <a href="#" className="p-2 hover:bg-gray-200 rounded">
            «
          </a>
          <a href="#" className="p-2 hover:bg-gray-200 rounded">
            1
          </a>
          <a href="#" className="p-2 hover:bg-gray-200 rounded">
            2
          </a>
          <a href="#" className="p-2 hover:bg-gray-200 rounded">
            3
          </a>
          <a href="#" className="p-2 hover:bg-gray-200 rounded">
            4
          </a>
          <a href="#" className="p-2 hover:bg-gray-200 rounded">
            »
          </a>
        </div>
      </div>
    </div>
  )
}
