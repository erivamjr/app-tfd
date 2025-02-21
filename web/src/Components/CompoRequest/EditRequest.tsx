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
  const [conditions, setConditions] = useState({
    isPregnant: false,
    hasHypertension: false,
    hasDiabetes: false,
    isBedridden: false,
    hasCourtOrder: false,
    isSuspected: false,
  })
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
        setConditions({
          isPregnant: appointment.isPregnant || false,
          hasHypertension: appointment.hasHypertension || false,
          hasDiabetes: appointment.hasDiabetes || false,
          isBedridden: appointment.isBedridden || false,
          hasCourtOrder: appointment.hasCourtOrder || false,
          isSuspected: appointment.isSuspected || false,
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
      await api.patch(`/appointments/${id}`, {
        specialtyId: formData.specialtyId,
        patientId: formData.patientId,
        userId: formData.userId,
        priority: formData.priority,
        appointmentDate: formData.appointmentDate,
        diagnosis: formData.diagnosis,
        cid: formData.cid,
        requestingDoctor: formData.requestingDoctor,
        crm: formData.crm,
        requestCode: formData.requestCode,
        status: formData.status,
        notes: formData.notes,
        ...conditions,
      })
      alert('Agendamento atualizado com sucesso!')
      navigate('/requests')
    } catch (error) {
      console.error('Erro ao atualizar agendamento:', error)
      alert('Erro ao atualizar o agendamento.')
    }
  }

  if (isLoading) return <Alert type="success" message="Carregando..." />
  if (isError) return <Alert type="error" message="Erro ao carregar dados!" />

  const handleConditionChange = (condition: string) => {
    setConditions((prev) => ({
      ...prev,
      [condition]: !prev[condition],
    }))
  }

  return (
    <div>
      <AdminToolbar>
        <div className="rounded p-4 flex justify-between items-center bg-blue-600 text-white">
          <div className="text-2xl font-bold flex-1 text-center">
            Editar Agendamento
          </div>
          <div className="flex gap-3">
            <button
              className="bg-white text-blue-600 p-3 rounded shadow-md hover:bg-gray-100"
              onClick={() => navigate('/requests')}
            >
              <IoReturnDownBack />
            </button>
          </div>
        </div>
      </AdminToolbar>

      <Container>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5"
        >
          {/* Especialidade, Paciente e Usuário */}
          <div className="col-span-full">
            <Label label="Especialidade" />
            <Input
              type="text"
              name="specialtyName"
              value={formData.specialtyName}
              disabled
              onChange={handleChange}
            />
          </div>

          <div>
            <Label label="Paciente" />
            <Input
              type="text"
              name="patientName"
              value={formData.patientName}
              disabled
              onChange={handleChange}
            />
          </div>

          <div>
            <Label label="Usuário" />
            <Input
              type="text"
              name="userName"
              value={formData.userName}
              disabled
              onChange={handleChange}
            />
          </div>

          {/* Data do Agendamento, Prioridade e Status */}
          <div>
            <Label label="Data do Agendamento" />
            <Input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              disabled
            />
          </div>

          <div>
            <Label label="Prioridade" />
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full p-2 border rounded"
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
              className="w-full p-2 border rounded"
            >
              {Object.entries(statusTranslations).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          {/* Diagnóstico, CID e Código do Pedido */}
          <div>
            <Label label="Diagnóstico" />
            <Input
              type="text"
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label label="CID" />
            <Input
              type="text"
              name="cid"
              value={formData.cid}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label label="Código do Pedido" />
            <Input
              type="text"
              name="requestCode"
              value={formData.requestCode}
              onChange={handleChange}
            />
          </div>

          {/* Médico Solicitante e CRM */}
          <div>
            <Label label="Médico Solicitante" />
            <Input
              type="text"
              name="requestingDoctor"
              value={formData.requestingDoctor}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label label="CRM" />
            <Input
              type="text"
              name="crm"
              value={formData.crm}
              onChange={handleChange}
            />
          </div>

          {/* Condições do Paciente */}
          <div className="col-span-full">
            <Label label="Condições do Paciente" />
            <div className="grid grid-cols- md:grid-cols-3 lg:grid-cols-3 gap-4">
              {Object.entries({
                isPregnant: '🤰 Gestante',
                hasHypertension: '💓 Hipertensão',
                hasDiabetes: '🍬 Diabetes',
                isBedridden: '🛏️ Acamado',
                hasCourtOrder: '⚖️ Ordem Judicial',
                isSuspected: '🕵🏻‍♂ Suspeito',
              }).map(([key, label]) => (
                <label
                  key={key}
                  className="flex items-center space-x-2 p-3 bg-gray-100 rounded-lg shadow-sm w-full"
                >
                  <input
                    type="checkbox"
                    checked={conditions[key as keyof typeof conditions]}
                    onChange={() => handleConditionChange(key)}
                    className="w-5 h-5 text-blue-600 rounded"
                  />
                  <span className="text-gray-700 text-base font-medium">
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Notas */}
          <div className="col-span-full">
            <Label label="Notas" />
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Botão de Salvar */}
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 col-span-full"
          >
            Salvar Alterações
          </button>
        </form>
      </Container>
    </div>
  )
}
