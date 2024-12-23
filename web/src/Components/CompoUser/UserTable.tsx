import { useContext, useState } from 'react'
import { AuthContext } from '../Context/Auth'
import { DataContext } from '../Context/DataContext'
import Alert from '../Ux/Alert/Alert'
import Table from '../Ux/Table/Table'
import TableCell from '../Ux/Table/TableCell'
import TableRow from '../Ux/Table/TableRow'
import { CardHeader } from '../Ux/Table/CardHeader'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { ThreeWaySwitch, UserRole } from '../Ux/ThreeWaySwitch'

export default function UserTable() {
  const { user } = useContext(AuthContext)
  const { users, updateUser } = useContext(DataContext)
  const [expandedRows, setExpandedRows] = useState<string[]>([])
  const [alert, setAlert] = useState<{
    show: boolean
    type: 'success' | 'error'
    message: string
  }>({
    show: false,
    type: 'success',
    message: '',
  })

  const toggleRow = (userId: string) => {
    setExpandedRows((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    )
  }

  const roleOptions: { value: UserRole; label: string; color: string }[] = [
    { value: 'admin', label: 'Admin', color: 'bg-green-100 text-green-800' },
    { value: 'user', label: 'User', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'guest', label: 'Guest', color: 'bg-red-100 text-red-800' },
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

  if (user?.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <h1 className="text-2xl font-bold text-gray-700">
          Você não tem permissão para acessar essa área
        </h1>
      </div>
    )
  }

  const headers = [
    'Nome',
    'Local',
    'Email',
    'Telefone',
    'CPF',
    'Função',
    'Status',
    'Ações',
  ]

  return (
    <div className="space-y-4">
      {alert.show && <Alert type={alert.type} message={alert.message} />}
      <Table>
        <CardHeader headers={headers} />
        <TableRow isHeader>
          <TableCell isHeader>Nome</TableCell>
          <TableCell isHeader>Local</TableCell>
          <TableCell isHeader>Email</TableCell>
          <TableCell isHeader>Telefone</TableCell>
          <TableCell isHeader>CPF</TableCell>
          <TableCell isHeader>Função</TableCell>
          <TableCell isHeader>Status</TableCell>
          <TableCell isHeader>Ações</TableCell>
        </TableRow>
        {users.map((currentUser) => (
          <div key={currentUser.id}>
            <div
              className="lg:hidden p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleRow(currentUser.id)}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">
                  {currentUser.name}
                </span>
                {expandedRows.includes(currentUser.id) ? (
                  <FaChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <FaChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </div>
              {expandedRows.includes(currentUser.id) && (
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Local</p>
                    <p className="text-sm text-gray-900">
                      {currentUser.workLocation}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-sm text-gray-900">{currentUser.email}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Telefone</p>
                    <p className="text-sm text-gray-900">{currentUser.phone}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">CPF</p>
                    <p className="text-sm text-gray-900">{currentUser.cpf}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Função</p>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                        ${
                          currentUser.role === 'admin'
                            ? 'bg-green-100 text-green-800'
                            : currentUser.role === 'user'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }
                      `}
                    >
                      {currentUser.role}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Status</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleToggleActive(currentUser.id, currentUser.active)
                      }}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                        ${
                          currentUser.active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }
                      `}
                    >
                      {currentUser.active ? 'Ativo' : 'Inativo'}
                    </button>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Ações</p>
                    <ThreeWaySwitch
                      options={roleOptions}
                      value={currentUser.role as UserRole}
                      onChange={(newRole) => {
                        handleRoleChange(currentUser.id, newRole)
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="hidden lg:flex">
              <TableRow>
                <TableCell label="Nome">
                  <div className="font-medium">{currentUser.name}</div>
                </TableCell>
                <TableCell label="Local">{currentUser.workLocation}</TableCell>
                <TableCell label="Email">{currentUser.email}</TableCell>
                <TableCell label="Telefone">{currentUser.phone}</TableCell>
                <TableCell label="CPF">{currentUser.cpf}</TableCell>
                <TableCell label="Função">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                      ${
                        currentUser.role === 'admin'
                          ? 'bg-green-100 text-green-800'
                          : currentUser.role === 'user'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }
                    `}
                  >
                    {currentUser.role}
                  </span>
                </TableCell>
                <TableCell label="Status">
                  <button
                    onClick={() =>
                      handleToggleActive(currentUser.id, currentUser.active)
                    }
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                      ${
                        currentUser.active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }
                    `}
                  >
                    {currentUser.active ? 'Ativo' : 'Inativo'}
                  </button>
                </TableCell>
                <TableCell label="Ações">
                  <ThreeWaySwitch
                    options={roleOptions}
                    value={currentUser.role as UserRole}
                    onChange={(newRole) =>
                      handleRoleChange(currentUser.id, newRole)
                    }
                  />
                </TableCell>
              </TableRow>
            </div>
          </div>
        ))}
      </Table>
    </div>
  )
}
