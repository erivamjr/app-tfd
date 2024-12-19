import { useContext, useState } from 'react'
import Table from '../Ux/Table/Table'
import TableCell from '../Ux/Table/TableCell'
import TableRow from '../Ux/Table/TableRow'

import { AuthContext } from '../Context/Auth'
import { DataContext } from '../Context/DataContext'
import Alert from '../Ux/Alert/Alert'

type UserRole = 'admin' | 'user' | 'guest'

interface ThreeWaySwitchProps {
  options: { value: UserRole; label: string; color: string }[]
  value: UserRole
  onChange: (value: UserRole) => void
}

const ThreeWaySwitch = ({ options, value, onChange }: ThreeWaySwitchProps) => {
  return (
    <div className="inline-flex gap-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`
            px-2 py-1 rounded text-xs transition-all
            ${value === option.value ? option.color : 'bg-gray-200'}
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default function UserTable() {
  const { user } = useContext(AuthContext)
  const { users, updateUser } = useContext(DataContext)
  const [alert, setAlert] = useState<{
    show: boolean
    type: 'success' | 'error'
    message: string
  }>({
    show: false,
    type: 'success',
    message: '',
  })

  const roleOptions: { value: UserRole; label: string; color: string }[] = [
    { value: 'admin', label: 'Admin', color: 'bg-green-300' },
    { value: 'user', label: 'User', color: 'bg-yellow-300' },
    { value: 'guest', label: 'Guest', color: 'bg-red-300' },
  ]

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      await updateUser(userId, { role: newRole })
      setAlert({
        show: true,
        type: 'success',
        message: 'Permissão atualizada com sucesso!',
      })
    } catch (error) {
      setAlert({
        show: true,
        type: 'error',
        message: 'Erro ao atualizar permissão',
      })
    } finally {
      setTimeout(() => {
        setAlert((prev) => ({ ...prev, show: false }))
      }, 3000)
    }
  }

  const handleToggleActive = async (userId: string, currentActive: boolean) => {
    try {
      await updateUser(userId, { active: !currentActive })
      setAlert({
        show: true,
        type: 'success',
        message: `Usuário ${!currentActive ? 'ativado' : 'desativado'} com sucesso!`,
      })
    } catch (error) {
      setAlert({
        show: true,
        type: 'error',
        message: 'Erro ao alterar status do usuário',
      })
    } finally {
      setTimeout(() => {
        setAlert((prev) => ({ ...prev, show: false }))
      }, 3000)
    }
  }

  return user?.role === 'admin' ? (
    <>
      {alert.show && <Alert type={alert.type} message={alert.message} />}
      <Table>
        <TableRow>
          <TableCell isHeader>Name</TableCell>
          <TableCell isHeader>Local</TableCell>
          <TableCell isHeader>Email</TableCell>
          <TableCell isHeader>Phone</TableCell>
          <TableCell isHeader>CPF</TableCell>
          <TableCell isHeader>Role</TableCell>
          <TableCell isHeader>Status</TableCell>
          <TableCell isHeader>Ações</TableCell>
        </TableRow>

        {users.map((currentUser) => (
          <TableRow key={currentUser.id}>
            <TableCell>{currentUser.name}</TableCell>
            <TableCell>{currentUser.workLocation}</TableCell>
            <TableCell>{currentUser.email}</TableCell>
            <TableCell>{currentUser.phone}</TableCell>
            <TableCell>{currentUser.cpf}</TableCell>
            <TableCell>
              <p
                className={`rounded-2xl p-1 text-xs text-center ${
                  currentUser.role === 'admin'
                    ? 'bg-green-300'
                    : currentUser.role === 'user'
                      ? 'bg-yellow-300'
                      : 'bg-red-300'
                }`}
              >
                {currentUser.role}
              </p>
            </TableCell>
            <TableCell>
              <button
                onClick={() =>
                  handleToggleActive(currentUser.id, currentUser.active)
                }
                className={`rounded-2xl p-1 text-xs w-16 ${
                  currentUser.active ? 'bg-green-300' : 'bg-red-300'
                }`}
              >
                {currentUser.active ? 'Ativo' : 'Inativo'}
              </button>
            </TableCell>
            <TableCell>
              <ThreeWaySwitch
                options={roleOptions}
                value={currentUser.role as UserRole}
                onChange={(newRole) =>
                  handleRoleChange(currentUser.id, newRole)
                }
              />
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </>
  ) : (
    <h1 className="text-center text-2xl font-bold">
      Você não tem permissão para acessar essa área
    </h1>
  )
}
