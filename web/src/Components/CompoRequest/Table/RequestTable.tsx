import { ChangeEvent, useState } from 'react'
import useAppointment from '../../Hooks/Api/Appointments/Appointments'
import { CiSearch } from 'react-icons/ci'
import Input from '../../Ux/Input/Input'
import Table from '../../Ux/Table/Table'
import { TableActions } from '../../Ux/Table/TableActions'
import TableCell from '../../Ux/Table/TableCell'
import TableRow from '../../Ux/Table/TableRow'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { TbReportSearch } from 'react-icons/tb'
import { Pagination } from '../../Ux/Table/Pagination '

export default function RequestTable() {
  const { appointments } = useAppointment()
  const [searchValue, setSearchValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const totalPages = Math.ceil((appointments?.length || 0) / itemsPerPage)

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
    // Se você tiver uma lógica de pesquisa, coloque-a aqui
  }

  // Função para exibir os compromissos da página atual
  const displayAppointments = () => {
    if (!appointments) return []

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = Math.min(startIndex + itemsPerPage, appointments.length)
    return appointments.slice(startIndex, endIndex)
  }

  // Event listener para mudar de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div>
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
        <TableRow>
          <TableCell isHeader>Nome</TableCell>
          <TableCell isHeader>CPF</TableCell>
          <TableCell isHeader>Telefone</TableCell>
          <TableCell isHeader>Especialidade</TableCell>
          <TableCell isHeader>Data de Cadastro</TableCell>
          <TableCell isHeader>Configurações</TableCell>
        </TableRow>
        {displayAppointments().map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell>{appointment.patient.name}</TableCell>
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
              <div className="flex justify-between items-center w-full">
                <TableActions
                  id={appointment.id}
                  url={'detalhessolicitacao'}
                  icon={<TbReportSearch />}
                  color={'bg-blue-500 hover:bg-blue-700'}
                  text={'white'}
                />
                <TableActions
                  id={appointment.id}
                  url={'editarsolicitacao'}
                  icon={<FaRegEdit />}
                  color={'bg-green-500 hover:bg-green-700'}
                  text={'white'}
                />
                <TableActions
                  id={appointment.id}
                  url={'excluir'}
                  icon={<RiDeleteBin6Line />}
                  color={'bg-red-500 hover:bg-red-700'}
                  text={'white'}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
