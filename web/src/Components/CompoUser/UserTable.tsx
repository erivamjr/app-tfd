import { useContext } from 'react'
import Table from '../Ux/Table/Table'
import { TableActions } from '../Ux/Table/TableActions'
import TableCell from '../Ux/Table/TableCell'
import TableRow from '../Ux/Table/TableRow'

import { AuthContext } from '../Context/Auth'
import { DataContext } from '../Context/DataContext'

export default function UserTable() {
  const { user } = useContext(AuthContext)
  console.log('CONSOLANDO USER DO CONTEXT', user)
  const { users } = useContext(DataContext)

  return user?.role === 'admin' ? (
    <Table>
      <TableRow>
        <TableCell isHeader>Name</TableCell>
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
          <TableCell>{user.email}</TableCell>
          <TableCell>{user.phone}</TableCell>
          <TableCell>{user.cpf}</TableCell>
          <TableCell>{user.role}</TableCell>
          <TableCell>{user.active ? 'Yes' : 'No'}</TableCell>
          <TableCell>
            <TableActions
              id={user.id}
              icon="edit"
              url={`/users/${user.id}`}
              color="blue"
              text="Edit"
            />
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
