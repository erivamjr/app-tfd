import { useEffect, useState } from 'react'
import Alert from '../Ux/Alert/Alert'
import Table from '../Ux/Table/Table'
import TableCell from '../Ux/Table/TableCell'
import TableRow from '../Ux/Table/TableRow'
import { CardHeader } from '../Ux/Table/CardHeader'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { ThreeWaySwitch, UserRole } from '../Ux/ThreeWaySwitch'
import { useUsersPage } from '../Hooks/Api/Users/UsersPage'
import { Pagination } from '../Ux/Table/Pagination '
import api from '../../Api'
import { useToast } from '../Context/ToastContext'

export default function UserTable() {
  const { showSuccess, showError } = useToast()
  const { users, total, page, setPage, isLoading, isError } = useUsersPage()
  const [expandedRows, setExpandedRows] = useState<string[]>([])
  const [localUsers, setLocalUsers] = useState(users)

  useEffect(() => {
    setLocalUsers((prevUsers) => {
      const usersWithoutSUSLine = users.filter(
        (user) => user.id !== '141acc2f-be65-410a-9ffe-9a5fdb7fed0c',
      )
      const updatedUsers = usersWithoutSUSLine.map((user) => {
        const prevUser = prevUsers.find((prev) => prev.id === user.id)
        return prevUser ? { ...prevUser, ...user } : user
      })
      return updatedUsers
    })
  }, [users])

  const toggleExpandRow = (userId: string) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(userId)
        ? prevExpandedRows.filter((id) => id !== userId)
        : [...prevExpandedRows, userId],
    )
  }

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    const response = await api.patch(`/users/${userId}`, { role: newRole })

    setLocalUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user,
      ),
    )

    if (response.status === 200) {
      showSuccess('Permissão do usuário atualizada com sucesso!')
      // Removido: setPage(1);
    } else {
      showError('Erro ao atualizar a permissão do usuário!')
    }
  }

  const handleStatusChange = async (userId: string, newStatus: boolean) => {
    const response = await api.patch(`/users/${userId}`, { active: newStatus })

    setLocalUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, active: newStatus } : user,
      ),
    )

    if (response.status === 200) {
      showSuccess('Status do usuário atualizado com sucesso!')
      // Removido: setPage(1);
    } else {
      showError('Erro ao atualizar o status do usuário')
    }
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
      {isError && <Alert type="error" message="Erro ao carregar usuários!" />}
      {isLoading ? (
        <Alert type="success" message="Carregando usuários..." />
      ) : (
        <Table>
          <CardHeader headers={headers} />
          <TableRow isHeader>
            {headers.map((header) => (
              <TableCell key={header} isHeader>
                {header}
              </TableCell>
            ))}
          </TableRow>
          {localUsers.map((currentUser) => (
            <div key={currentUser.id}>
              {/* Modo Mobile */}
              <div
                className="lg:hidden p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleExpandRow(currentUser.id)}
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
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-gray-500">Local</p>
                    <p className="text-sm text-gray-900">
                      {currentUser.workLocation}
                    </p>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-sm text-gray-900">{currentUser.email}</p>
                    <p className="text-sm text-gray-500">Telefone</p>
                    <p className="text-sm text-gray-900">{currentUser.phone}</p>
                    <p className="text-sm text-gray-500">CPF</p>
                    <p className="text-sm text-gray-900">{currentUser.cpf}</p>
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
                    <p className="text-sm text-gray-500">Status</p>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleStatusChange(currentUser.id, !currentUser.active)
                      }}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200
                        ${
                          currentUser.active
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }
                      `}
                    >
                      {currentUser.active ? 'Ativo' : 'Inativo'}
                    </button>
                    <p className="text-sm text-gray-500">Ações</p>
                    <div className="mt-4">
                      {/* Mantemos o mesmo switch de ações */}
                      <ThreeWaySwitch
                        options={[
                          {
                            value: 'admin',
                            label: 'Admin',
                            color: 'bg-green-100 text-green-800',
                          },
                          {
                            value: 'user',
                            label: 'User',
                            color: 'bg-yellow-100 text-yellow-800',
                          },
                          {
                            value: 'guest',
                            label: 'Guest',
                            color: 'bg-red-100 text-red-800',
                          },
                        ]}
                        value={currentUser.role as UserRole}
                        onChange={(newRole) =>
                          handleRoleChange(currentUser.id, newRole)
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
              {/* Modo Desktop */}
              <div className="hidden lg:flex">
                <TableRow>
                  <TableCell>{currentUser.name}</TableCell>
                  <TableCell>{currentUser.workLocation}</TableCell>
                  <TableCell>{currentUser.email}</TableCell>
                  <TableCell>{currentUser.phone}</TableCell>
                  <TableCell>{currentUser.cpf}</TableCell>
                  <TableCell>
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
                  <TableCell>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleStatusChange(currentUser.id, !currentUser.active)
                      }}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200
                        ${
                          currentUser.active
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }
                      `}
                    >
                      {currentUser.active ? 'Ativo' : 'Inativo'}
                    </button>
                  </TableCell>
                  <TableCell>
                    <ThreeWaySwitch
                      options={[
                        {
                          value: 'admin',
                          label: 'Admin',
                          color: 'bg-green-100 text-green-800',
                        },
                        {
                          value: 'user',
                          label: 'User',
                          color: 'bg-yellow-100 text-yellow-800',
                        },
                        {
                          value: 'guest',
                          label: 'Guest',
                          color: 'bg-red-100 text-red-800',
                        },
                      ]}
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
      )}
      {/* Paginação */}
      <Pagination
        currentPage={page}
        totalPages={total}
        onPageChange={setPage}
      />
    </div>
  )
}
