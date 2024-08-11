import React from 'react'
import Table from '../../Ux/table/Table'
import { Pagination } from '../../Ux/table/Pagination '
import { TableActions } from '../../Ux/table/TableActions'
import TableCell from '../../Ux/table/TableCell'
import TableRow from '../../Ux/table/TableRow'

export default function RequestTable() {
  const users = [
    {
      id: 1,
      nome: 'João Silva',
      cpf: '123.456.789-00',
      telefone: '(11) 91234-5678',
      usuario: 'joao.silva',
      dataDeCadastro: '2024-01-15',
    },
    {
      id: 2,
      nome: 'Maria Oliveira',
      cpf: '987.654.321-00',
      telefone: '(21) 92345-6789',
      usuario: 'maria.oliveira',
      dataDeCadastro: '2024-02-20',
    },
    {
      id: 3,
      nome: 'Carlos Pereira',
      cpf: '123.123.123-12',
      telefone: '(31) 93456-7890',
      usuario: 'carlos.pereira',
      dataDeCadastro: '2024-03-10',
    },
    {
      id: 4,
      nome: 'Ana Costa',
      cpf: '321.321.321-21',
      telefone: '(41) 94567-8901',
      usuario: 'ana.costa',
      dataDeCadastro: '2024-04-05',
    },
    {
      id: 5,
      nome: 'Lucas Fernandes',
      cpf: '456.456.456-45',
      telefone: '(51) 95678-9012',
      usuario: 'lucas.fernandes',
      dataDeCadastro: '2024-05-25',
    },
    {
      id: 6,
      nome: 'Bruna Souza',
      cpf: '789.789.789-78',
      telefone: '(61) 96789-0123',
      usuario: 'bruna.souza',
      dataDeCadastro: '2024-06-15',
    },
  ]

  return (
    <Table>
      <TableRow>
        <TableCell isHeader>ID</TableCell>
        <TableCell isHeader>Nome</TableCell>
        <TableCell isHeader>CPF</TableCell>
        <TableCell isHeader>Telefone</TableCell>
        <TableCell isHeader>Usuario</TableCell>
        <TableCell isHeader>Data de Cadastro</TableCell>
        <TableCell isHeader>Configurações</TableCell>
      </TableRow>
      {users.map((user) => (
        <TableRow key={user.id}>
          <TableCell>{user.id}</TableCell>
          <TableCell>{user.nome}</TableCell>
          <TableCell>{user.cpf}</TableCell>
          <TableCell>{user.telefone}</TableCell>
          <TableCell>{user.usuario}</TableCell>
          <TableCell>
            {new Date(user.dataDeCadastro).toLocaleDateString('pt-BR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </TableCell>
          <TableCell>
            <TableActions id={user.id} />
          </TableCell>
        </TableRow>
      ))}
      <Pagination />
    </Table>
  )
}
