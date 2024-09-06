import Table from '../Ux/table/Table'
import { TableActions } from '../Ux/table/TableActions'
import TableCell from '../Ux/table/TableCell'
import TableRow from '../Ux/table/TableRow'

const userData = [
  {
    id: 'ed5c416c-46a0-4e93-9484-d555c70af284',
    name: 'Geiza',
    email: 'geizaportel@gmail.com',
    phone: '91991782007',
    cpf: '777.777.555-05',
    role: 'user',
    active: true,
    createdAt: '2024-07-31T23:38:40.141Z',
    updatedAt: '2024-07-31T23:38:40.141Z',
  },
]

export default function UserTable() {
  return (
    <Table>
      <TableRow>
        <TableCell isHeader>ID</TableCell>
        <TableCell isHeader>Name</TableCell>
        <TableCell isHeader>Email</TableCell>
        <TableCell isHeader>Phone</TableCell>
        <TableCell isHeader>CPF</TableCell>
        <TableCell isHeader>Role</TableCell>
        <TableCell isHeader>Active</TableCell>
        <TableCell isHeader>Configurações</TableCell>
      </TableRow>
      {userData.map((user) => (
        <TableRow key={user.id}>
          <TableCell>{user.id}</TableCell>
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
  )
}
