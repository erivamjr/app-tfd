import { ChangeEvent, useState } from 'react'

import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { TbReportSearch } from 'react-icons/tb'
import useAppointment from '../../Hooks/Api/Appointments/Appointments'
import { CiSearch } from 'react-icons/ci'
import Input from '../../Ux/Input/Input'
import Table from '../../Ux/Table/Table'
import { TableActions } from '../../Ux/Table/TableActions'
import TableCell from '../../Ux/Table/TableCell'
import TableRow from '../../Ux/Table/TableRow'

export default function RequestTable() {
  const { appointments } = useAppointment()
  const [searchValue, setSearchValue] = useState('')

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
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
          <TableCell isHeader>Especialidade</TableCell>
          <TableCell isHeader>Data de Cadastro</TableCell>
          <TableCell isHeader>Configurações</TableCell>
        </TableRow>
        {appointments ? (
          appointments.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.patient.name}</TableCell>
              <TableCell>{user.patient.cpf}</TableCell>
              <TableCell>{user.patient.phone}</TableCell>
              <TableCell>{user.specialty.name}</TableCell>
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
                    color={'bg-blue-500 hover:bg-blue-700'}
                    text={'white'}
                  />
                  <TableActions
                    id={user.id}
                    url={'editarsolicitacao'}
                    icon={<FaRegEdit />}
                    color={'bg-green-500 hover:bg-green-700'}
                    text={'white'}
                  />
                  <TableActions
                    id={user.id}
                    url={'excluir'}
                    icon={<RiDeleteBin6Line />}
                    color={'bg-red-500 hover:bg-red-700'}
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
