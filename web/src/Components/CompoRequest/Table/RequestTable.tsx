import React from 'react'
import Table from '../../Ux/table/Table'
import { TableActions } from '../../Ux/table/TableActions'
import TableCell from '../../Ux/table/TableCell'
import TableRow from '../../Ux/table/TableRow'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { TbReportSearch } from 'react-icons/tb'
import useAppointment from '../../Hooks/Api/Appointments/Appointments'
import { CiSearch } from 'react-icons/ci'
import Input from '../../Ux/Input/Input'

export default function RequestTable() {
  const { appointments } = useAppointment()
  const [searchValue, setSearchValue] = React.useState('')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
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
        <button className="bg-blue-600 text-white hover:bg-blue-500 p-3 rounded">
          <CiSearch />
        </button>
      </div>
      <Table>
        <TableRow>
          <TableCell isHeader>Nome</TableCell>
          <TableCell isHeader>CPF</TableCell>
          <TableCell isHeader>Telefone</TableCell>
          <TableCell isHeader>Usuario</TableCell>
          <TableCell isHeader>Data de Cadastro</TableCell>
          <TableCell isHeader>Configurações</TableCell>
        </TableRow>
        {appointments ? (
          appointments.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.patient.name}</TableCell>
              <TableCell>{user.patient.cpf}</TableCell>
              <TableCell>{user.patient.phone}</TableCell>
              <TableCell>{user.patient.userId}</TableCell>
              <TableCell>
                {new Date(user.createdAt).toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </TableCell>
              <TableCell>
                <div className="flex justify-between items-center w-full">
                  <TableActions
                    id={user.id}
                    url={'detalhessolicitacao'}
                    icon={<TbReportSearch />}
                    color={'yellow'}
                    text={'white'}
                  />
                  <TableActions
                    id={user.id}
                    url={'editarsolicitacao'}
                    icon={<FaRegEdit />}
                    color={'green'}
                    text={'white'}
                  />
                  <TableActions
                    id={user.id}
                    url={'excluir'}
                    icon={<RiDeleteBin6Line />}
                    color={'red'}
                    text={'white'}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <></>
        )}
      </Table>
    </div>
  )
}
