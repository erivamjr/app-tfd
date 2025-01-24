import { useState, useEffect } from 'react'
import api from '../../../Api'
import ChartComponent from '../ChartComponent'
import { TfiAgenda } from 'react-icons/tfi'
import { Card } from '../../Ux/Card'
import { RiUserAddLine } from 'react-icons/ri'

interface TopSpecialtyProps {
  specialty: string
  count: number
}

interface AppointmentsByStatusProps {
  InProgress: number
  Scheduled: number
  Completed: number
}

interface TopPatientProps {
  name: string
  appointmentCount: number
}

const CardHome = () => {
  const [appointmentsByMonth, setAppointmentsByMonth] = useState([])
  const [appointmentsByStatus, setAppointmentsByStatus] =
    useState<AppointmentsByStatusProps>({} as AppointmentsByStatusProps)
  const [topSpecialties, setTopSpecialties] = useState<TopSpecialtyProps[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [startDate, setStartDate] = useState('2024-01-01')
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0])
  const [topPatients, setTopPatients] = useState<TopPatientProps[]>([])

  const fetchAppointmentsByMonth = async () => {
    try {
      const response = await api.get('/dashboard/appointments-by-month', {
        params: { startDate, endDate },
      })
      setAppointmentsByMonth(response.data)
    } catch (error) {
      console.error('Error fetching appointments by month:', error)
    }
  }

  const fetchAppointmentsByStatus = async () => {
    try {
      const response = await api.get('/dashboard/appointments-by-status', {
        params: { startDate, endDate },
      })
      setAppointmentsByStatus(response.data)
    } catch (error) {
      console.error('Error fetching appointments by status:', error)
    }
  }

  const fetchTopSpecialties = async () => {
    try {
      const response = await api.get('/dashboard/top-specialties', {
        params: { startDate, endDate },
      })
      setTopSpecialties(response.data)
    } catch (error) {
      console.error('Error fetching top specialties:', error)
    }
  }

  const fetchTopPatients = async () => {
    try {
      const response = await api.get('/dashboard/top-patients', {
        params: { startDate, endDate },
      })

      setTopPatients(response.data)
    } catch (error) {
      console.error('Error fetching top patients:', error)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    fetchAppointmentsByMonth()
    fetchAppointmentsByStatus()
    fetchTopSpecialties()
    fetchTopPatients()
    setIsLoading(false)
  }, [startDate, endDate])

  if (isLoading) return <div>Loading...</div>

  // Transforma o objeto de status para array
  const statusData = Object.entries(appointmentsByStatus).map(
    ([status, count]) => ({
      label: status,
      total: count,
    }),
  )

  console.log('topPatients', topPatients)

  return (
    <div className="grid grid-cols-1 gap-4 my-10 px-4 md:px-0">
      {/* Filtro de Data */}
      <div className="flex flex-col bg-blue-100 p-6 rounded-lg shadow-md mb-6">
        <div className="flex items-center justify-between mb-4 flex-col md:flex-row gap-4">
          <h2 className="text-2xl font-semibold">Solicitações</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mr-2 border border-gray-300 rounded-md px-2 py-1"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mr-2 border border-gray-300 rounded-md px-2 py-1"
            />
          </div>
        </div>
        <p className="text-gray-600">
          Seja bem-vindo ao Dashboard! Aqui, você pode visualizar informações
          importantes sobre solicitações.
        </p>
      </div>

      {/* Cards de Contagem */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          color="green"
          title="Pacientes"
          icon={<RiUserAddLine size={24} />}
          number={appointmentsByMonth.length}
        />
        <Card
          color="blue"
          title="Solicitações"
          icon={<TfiAgenda size={24} />}
          number={appointmentsByStatus.InProgress}
        />
        <Card
          color="yellow"
          title="Agendados"
          icon={<TfiAgenda size={24} />}
          number={appointmentsByStatus.Scheduled}
        />
        <Card
          color="red"
          title="Finalizados"
          icon={<TfiAgenda size={24} />}
          number={appointmentsByStatus.Completed}
        />
      </div>

      {/* Top 10 Pacientes */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Top 10 Pacientes</h2>
        <div className="overflow-x-auto">
          {' '}
          {/* Adiciona rolagem horizontal para telas menores */}
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Solicitações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topPatients.map((patient) => (
                <tr
                  key={patient.name}
                  className="hover:bg-gray-100" // Adiciona o efeito de hover
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {patient.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {patient.appointmentCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 gap-4 my-10">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ChartComponent
            type="bar"
            data={appointmentsByMonth}
            title="Solicitações por Mês"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ChartComponent
              type="pie"
              data={statusData}
              title="Solicitações por Status"
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <ChartComponent
              type="pie"
              data={topSpecialties.map((specialty) => ({
                label: specialty.specialty,
                total: specialty.count,
              }))}
              title="Top 10 Especialidades"
              height={400}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardHome
