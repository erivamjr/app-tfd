import { CiSearch } from 'react-icons/ci'
import Input from '../Ux/Input/Input'
import DisplayMessage from '../Ux/DisplayMessage/DisplayMessage'
import Table from '../Ux/Table/Table'
import TableRow from '../Ux/Table/TableRow'
import TableCell from '../Ux/Table/TableCell'
import { TypeAppointment } from '../Hooks/Api/Appointments/TypeAppointments'

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
      <div className="mb-5 flex flex-1 items-center space-x-2">
        <Input
          type="text"
          name="pesquisar"
          placeholder="Pesquisar"
          value=""
          onChange={() => {}}
        />
        <button className="bg-blue-600 text-white hover:bg-blue-500 p-3 rounded">
          <CiSearch />
        </button>
      </div>

      <Table>
        <TableRow>
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
            <TableCell>{itemData.patient.name}</TableCell>
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

      {/* Seção de Paginação */}
      <div className="flex self-start justify-center mt-4">
        <div className="flex gap-3">
          <a href="#">«</a>
          <a href="#">1</a>
          <a href="#">2</a>
          <a href="#">3</a>
          <a href="#">4</a>
          <a href="#">»</a>
        </div>
      </div>
    </div>
  )
}
