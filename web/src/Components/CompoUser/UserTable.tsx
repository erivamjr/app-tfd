import { useContext } from 'react'
import Table from '../Ux/Table/Table'
import TableCell from '../Ux/Table/TableCell'
import TableRow from '../Ux/Table/TableRow'

import { AuthContext } from '../Context/Auth'
import { DataContext } from '../Context/DataContext'

export default function UserTable() {
  const { user } = useContext(AuthContext)
  const { users } = useContext(DataContext)
  const local = 'UBS - Centro'

  return user?.role === 'admin' ? (
    <Table>
      <TableRow>
        <TableCell isHeader>Name</TableCell>
        <TableCell isHeader>Local</TableCell>
        <TableCell isHeader>Email</TableCell>
        <TableCell isHeader>Phone</TableCell>
        <TableCell isHeader>CPF</TableCell>
        <TableCell isHeader>Role</TableCell>
        <TableCell isHeader>Active</TableCell>
        <TableCell isHeader>Configurações</TableCell>
      </TableRow>

      {users.map((user) => (
        <TableRow key={user.id}>
          <TableCell>{user.name}</TableCell>
          <TableCell>{local}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>{user.phone}</TableCell>
          <TableCell>{user.cpf}</TableCell>
          <TableCell>
            <p
              className={
                user.role === 'admin'
                  ? 'bg-green-300 rounded-2xl p-1 text-xs'
                  : user.role === 'user'
                    ? 'bg-yellow-300 rounded-2xl p-1 text-xs'
                    : 'bg-red-300 rounded-2xl p-1 text-xs'
              }
            >
              {user.role}
            </p>
          </TableCell>
          <TableCell>{user.active ? 'Yes' : 'No'}</TableCell>
          <TableCell>
            <button className="bg-green-300 p-1 rounded border m-1">
              admin
            </button>
            <button className="bg-yellow-300 p-1 rounded border m-1">
              user
            </button>
            <button className="bg-red-300 p-1 rounded border m-1">guest</button>
          </TableCell>
        </TableRow>
      ))}
    </Table>
  ) : (
    <h1 className="text-center text-2xl font-bold">
      Voce nao tem permissao para acessar essa area
    </h1>
  )
}
