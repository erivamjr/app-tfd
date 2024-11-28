import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import Alert from '../Ux/Alert/Alert'
import Container from '../Ux/Container/Container'
import AdminToolbar from '../Ux/AdminToolbar/AdminToolbar'
import { IoReturnDownBack } from 'react-icons/io5'
import api from '../../Api'
import { Priority, Status } from '../Hooks/Api/Appointments/TypeAppointments'
import Input from '../Ux/Input/Input'
import Label from '../Ux/Label/Label'

export default function EditRequest() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  // const { user } = useContext(AuthContext)
  // console.log('USER', user)

  const [formData, setFormData] = useState({
    specialtyName: '',
    patientName: '',
    userName: '',
    specialtyId: '',
    patientId: '',
    userId: '',
    priority: Priority.Normal,
    appointmentDate: '',
    diagnosis: '',
    cid: '',
    requestingDoctor: '',
    crm: '',
    requestCode: '',
    requestDate: '',
    status: Status.InProgress,
    notes: '',
  })

  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const priorityTranslations = {
    [Priority.Normal]: 'Normal',
    [Priority.Elderly]: 'Idoso',
    [Priority.Pregnant]: 'Gestante',
    [Priority.Child]: 'Criança',
    [Priority.Emergency]: 'Emergência',
  }

  const statusTranslations = {
    [Status.InProgress]: 'Em Andamento',
    [Status.Scheduled]: 'Agendado',
    [Status.Completed]: 'Completado',
  }

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await api.get(`/appointments/${id}`)
        const appointment = response.data

        const formattedRequestDate = appointment.requestDate
          ? new Date(appointment.requestDate).toISOString().split('T')[0]
          : ''

        const formattedAppointmentDate = appointment.appointmentDate
          ? new Date(appointment.appointmentDate).toISOString().split('T')[0]
          : ''

        setFormData({
          specialtyName: appointment.specialty?.name || '',
          patientName: appointment.patient?.name || '',
          userName: appointment.user?.name || '',
          specialtyId: appointment.specialtyId || '',
          patientId: appointment.patientId || '',
          userId: appointment.userId || '',
          priority: appointment.priority || 'Normal',
          appointmentDate: formattedAppointmentDate,
          diagnosis: appointment.diagnosis || '',
          cid: appointment.cid || '',
          requestingDoctor: appointment.requestingDoctor || '',
          crm: appointment.crm || '',
          requestCode: appointment.requestCode || '',
          requestDate: formattedRequestDate,
          status: appointment.status || 'InProgress',
          notes: appointment.notes || '',
        })
        setIsLoading(false)
      } catch (error) {
        console.error('Erro ao carregar o agendamento:', error)
        setIsError(true)
        setIsLoading(false)
      }
    }

    fetchAppointment()
  }, [id])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.put(`/appointments/${id}`, formData)
      alert('Agendamento atualizado com sucesso!')
      navigate('/solicitacao')
    } catch (error) {
      console.error('Erro ao atualizar agendamento:', error)
      alert('Erro ao atualizar o agendamento.')
    }
  }

  if (isLoading) return <Alert type="success" message="Carregando..." />
  if (isError) return <Alert type="error" message="Erro ao carregar dados!" />

  return (
    <div>
      <AdminToolbar>
        <div className="p-2 flex">
          <div className="font-bold text-black text-2xl flex-1 text-center">
            Editar Agendamento
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/solicitacao')}
              className="bg-blue-600 text-white p-3 text-2xl rounded"
            >
              <IoReturnDownBack />
            </button>
          </div>
        </div>
      </AdminToolbar>

      <Container>
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-2 p-5">
          <div>
            <Label label="Especialidade ID" />
            <Input
              type="text"
              placeholder="Especialidade ID"
              name="specialtyId"
              value={formData.specialtyName}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label label="Paciente ID" />
            <Input
              type="text"
              placeholder="Paciente ID"
              name="patientId"
              value={formData.patientName}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label label="Usuário ID" />
            <Input
              type="text"
              placeholder="Usuário ID"
              name="userId"
              value={formData.userName}
              onChange={handleChange}
            />
          </div>

          <div className="md:grid grid-cols-2 gap-2">
            <div>
              <Label label="Prioridade" />
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {Object.entries(priorityTranslations).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label label="Status" />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {Object.entries(statusTranslations).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label label="Data do Agendamento" />
            <Input
              type="date"
              placeholder="Data do Agendamento"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label label="Diagnóstico" />
            <Input
              type="text"
              placeholder="Diagnóstico"
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
            />
          </div>

          <div className="md:grid grid-cols-2 gap-2">
            <div>
              <Label label="CID" />
              <Input
                type="text"
                placeholder="CID"
                name="cid"
                value={formData.cid}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label label="Código do Pedido" />
              <Input
                type="text"
                placeholder="Código do Pedido"
                name="requestCode"
                value={formData.requestCode}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <Label label="Médico Solicitante" />
            <Input
              type="text"
              placeholder="Médico Solicitante"
              name="requestingDoctor"
              value={formData.requestingDoctor}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label label="CRM" />
            <Input
              type="text"
              placeholder="CRM"
              name="crm"
              value={formData.crm}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label label="Notas" />
            <textarea
              placeholder="Notas"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 col-span-3"
          >
            Salvar Alterações
          </button>
        </form>
      </Container>
    </div>
  )
}
