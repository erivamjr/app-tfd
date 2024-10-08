import { CiFloppyDisk, CiSearch } from 'react-icons/ci'
import { RiUserAddLine } from 'react-icons/ri'
import Input from '../Ux/Input/Input'
import Label from '../Ux/Label/Label'
import Loading from '../Ux/Loading/Loading'
import Modal from '../Ux/Modal/Modal'
import { FormEvent, useState } from 'react'
import api from '../../Api'
import useSpecialties from '../Hooks/Api/Specialties/Specialties'
import usePatients from '../Hooks/Api/Patiens/Patients'
import Alert from '../Ux/Alert/Alert'

export default function CreateRequest() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { patients } = usePatients()
  const { specialties } = useSpecialties()
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
  const [type, setType] = useState<'success' | 'error' | 'warning' | 'info'>(
    'info',
  )
  const [alertMessage, setAlertMessage] = useState<string>('')

  const [patientId, setPatientId] = useState<string>('')
  const [specialtyId, setSpecialtyId] = useState<number | undefined>()
  const [priority, setPriority] = useState<string>('Normal')
  const [appointmentDate, setAppointmentDate] = useState<string>('')
  const [diagnosis, setDiagnosis] = useState<string>('')
  const [cid, setCid] = useState<string>('')
  const [requestingDoctor, setRequestingDoctor] = useState<string>('')
  const [crm, setCrm] = useState<string>('')
  const [requestCode, setRequestCode] = useState<string>('')
  const [status, setStatus] = useState<string>('InProgress')
  const [notes, setNotes] = useState<string>('')
  const [userId] = useState<string>('84d6d27e-475c-4e83-a1ae-b477698e399e') // Exemplo de ID de usuário
  const [requestDate] = useState<string>(new Date().toISOString()) // Data da solicitação no formato ISO

  function handleOpenModal() {
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    const requestData = {
      specialtyId: Number(specialtyId),
      patientId,
      userId,
      priority,
      appointmentDate,
      diagnosis,
      cid,
      requestingDoctor,
      crm,
      requestCode,
      requestDate,
      status,
      notes,
    }

    try {
      await api.post('appointments', requestData)
      setType('success')
      setAlertMessage('Solicitação criada com sucesso!')
      setIsAlertOpen(true)
      setTimeout(() => {
        setPatientId('')
        setSpecialtyId(undefined)
        setPriority('Normal')
        setAppointmentDate('')
        setDiagnosis('')
        setCid('')
        setRequestingDoctor('')
        setCrm('')
        setRequestCode('')
        setStatus('InProgress')
        setNotes('')
        setType('info')
        setAlertMessage('')
        setIsAlertOpen(false)
      }, 3000)
    } catch (error) {
      setType('error')
      setAlertMessage('Erro ao criar solicitação. Tente novamente.')
      setIsAlertOpen(true)
      setTimeout(() => {
        setType('info')
        setAlertMessage('')
        setIsAlertOpen(false)
      }, 3000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Nova Solicitação"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {isAlertOpen && <Alert type={type} message={alertMessage} />}
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 p-4 rounded-lg">
              <div className="text-lg font-semibold mb-2">Dados Pessoais</div>
              <div>
                <Label label="Nome do Paciente" />
                <input
                  list="patients-list"
                  placeholder="Selecione o paciente"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                />
                <datalist id="patients-list">
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name}
                    </option>
                  ))}
                </datalist>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label label="Diagnóstico" />
                  <Input
                    type="text"
                    name="diagnosis"
                    placeholder="Diagnóstico"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                  />
                  <Label label="Médico Solicitante" />
                  <Input
                    type="text"
                    name="requestingDoctor"
                    placeholder="Médico Solicitante"
                    value={requestingDoctor}
                    onChange={(e) => setRequestingDoctor(e.target.value)}
                  />
                </div>
                <div>
                  <Label label="CID" />
                  <Input
                    type="text"
                    name="cid"
                    placeholder="Digite o CID"
                    value={cid}
                    onChange={(e) => setCid(e.target.value)}
                  />
                  <Label label="CRM" />
                  <Input
                    type="text"
                    name="crm"
                    placeholder="CRM"
                    value={crm}
                    onChange={(e) => setCrm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 p-4 rounded-lg">
              <div className="text-lg font-semibold mb-2">Processo</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label label="Especialidade" />

                  <Input
                    list="specialties-list"
                    type="text"
                    name="specialtyId"
                    placeholder="Especialidade"
                    value={
                      specialtyId !== undefined ? specialtyId.toString() : ''
                    }
                    onChange={(e) => setSpecialtyId(Number(e.target.value))}
                  />
                  <datalist id="specialties-list">
                    {specialties.map((specialty) => (
                      <option key={specialty.id} value={specialty.id}>
                        {specialty.name}
                      </option>
                    ))}
                  </datalist>
                  <Label label="Código da Solicitação" />
                  <Input
                    type="text"
                    name="requestCode"
                    placeholder="Código da Solicitação"
                    value={requestCode}
                    onChange={(e) => setRequestCode(e.target.value)}
                  />
                  <Label label="Status" />
                  <select
                    name="status"
                    id="status"
                    className="rounded-md p-2 w-full"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="InProgress">InProgress</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <Label label="Data do Agendamento" />
                  <Input
                    type="date"
                    name="appointmentDate"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                  />
                  <Label label="Prioridade" />
                  <select
                    name="priority"
                    id="priority"
                    className="rounded-md p-2 w-full"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="Pregnant">Pregnant</option>
                    <option value="Child">Child</option>
                    <option value="Normal">Normal</option>
                    <option value="Elderly">Elderly</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                  <Label label="Observações" />
                  <textarea
                    name="notes"
                    id="notes"
                    cols={30}
                    rows={6}
                    className="rounded-md p-2 w-full"
                    placeholder="Observações"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button>{isLoading ? <Loading /> : <CiFloppyDisk />}</button>
          </div>
        </form>
      </Modal>
      <div className="flex justify-end p-3 space-x-4">
        <div
          onClick={handleOpenModal}
          className="bg-blue-600 text-white hover:bg-blue-500 p-3 rounded flex items-center space-x-2 cursor-pointer"
        >
          <span className="hidden md:block">Adicionar Solicitação</span>
          <RiUserAddLine />
        </div>
        <button>
          <CiSearch />
        </button>
      </div>
    </div>
  )
}
