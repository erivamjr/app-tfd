import React from 'react'
import TableRow from '../../Components/Ux/table/TableRow'
import TableCell from '../../Components/Ux/table/TableCell'
import Table from '../../Components/Ux/table/Table'

export default function UserTable() {
  return (
    <Table>
      <TableRow>
        <TableCell isHeader>ID</TableCell>
        <TableCell isHeader>Name</TableCell>
        <TableCell isHeader>Email</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>1</TableCell>
        <TableCell>John Doe</TableCell>
        <TableCell>john@example.com</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>2</TableCell>
        <TableCell>Jane Smith</TableCell>
        <TableCell>jane@example.com</TableCell>
      </TableRow>
    </Table>
  )
}
