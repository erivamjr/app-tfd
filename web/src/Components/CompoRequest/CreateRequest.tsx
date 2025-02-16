import { CiFloppyDisk } from 'react-icons/ci'
import Input from '../Ux/Input/Input'
import Label from '../Ux/Label/Label'
import Loading from '../Ux/Loading/Loading'

import { FormEvent, useContext, useState } from 'react'
import api from '../../Api'
import useSpecialties from '../Hooks/Api/Specialties/Specialties'
import Alert from '../Ux/Alert/Alert'
import { Patient } from '../Hooks/Api/Patiens/TypePatiens'
import CreatableSelect from 'react-select/creatable'
import Autocomplete from '../Ux/Autocomplete'

import { AuthContext } from '../Context/Auth'
import { useNavigate } from 'react-router-dom'
import { IoReturnDownBack } from 'react-icons/io5'
import AdminToolbar from '../Ux/AdminToolbar/AdminToolbar'
import Container from '../Ux/Container/Container'

export default function CreateRequest() {
  const [isLoadingPatient, setIsLoadingPatient] = useState<boolean>(false)
  const { specialties, isLoading } = useSpecialties()
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
  const [type, setType] = useState<'success' | 'error' | 'warning' | 'info'>(
    'info',
  )
  const [alertMessage, setAlertMessage] = useState<string>('')

  const [patientId, setPatientId] = useState<string>('')
  const [specialtyId, setSpecialtyId] = useState<string | undefined>()
  const [priority, setPriority] = useState<string>('Normal')
  const [appointmentDate, setAppointmentDate] = useState<string>(
    new Date().toISOString().split('T')[0],
  )
  const [diagnosis, setDiagnosis] = useState<string>('')
  const [cid, setCid] = useState<string>('')
  const [requestingDoctor, setRequestingDoctor] = useState<string>('')
  const [crm, setCrm] = useState<string>('')
  const [requestCode, setRequestCode] = useState<string>('')
  const [status, setStatus] = useState<string>('InProgress')
  const [notes, setNotes] = useState<string>('')
  const [requestDate] = useState<string>(new Date().toISOString()) // Data da solicitação no formato ISO
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [conditions, setConditions] = useState({
    isPregnant: false,
    hasHypertension: false,
    hasDiabetes: false,
    isBedridden: false,
    hasCourtOrder: false,
    isSuspected: false,
  })
  const [selectedSpecialty, setSelectedSpecialty] = useState(null)

  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!specialtyId) {
      setType('warning')
      setAlertMessage('Por favor, selecione uma especialidade.')
      setIsAlertOpen(true)
      return
    }

    if (!patientId) {
      setType('warning')
      setAlertMessage('Por favor, selecione um paciente.')
      setIsAlertOpen(true)
      return
    }

    if (!appointmentDate) {
      setType('warning')
      setAlertMessage('Por favor, selecione uma data.')
      setIsAlertOpen(true)
      return
    }

    if (!diagnosis) {
      setType('warning')
      setAlertMessage('Por favor, insira o diagnóstico.')
      setIsAlertOpen(true)
      return
    }

    if (!cid) {
      setType('warning')
      setAlertMessage('Por favor, insira o CID.')
      setIsAlertOpen(true)
      return
    }

    if (!requestingDoctor) {
      setType('warning')
      setAlertMessage('Por favor, insira o nome do médico solicitante.')
      setIsAlertOpen(true)
      return
    }

    if (!crm) {
      setType('warning')
      setAlertMessage('Por favor, insira o CRM do médico solicitante.')
      setIsAlertOpen(true)
      return
    }

    if (!requestCode) {
      setType('warning')
      setAlertMessage('Por favor, insira o código da solicitação.')
      setIsAlertOpen(true)
      return
    }

    if (!status) {
      setType('warning')
      setAlertMessage('Por favor, selecione o status da solicitação.')
      setIsAlertOpen(true)
      return
    }

    if (!notes) {
      setType('warning')
      setAlertMessage('Por favor, insira as notas da solicitação.')
      setIsAlertOpen(true)
      return
    }

    if (!requestDate) {
      setType('warning')
      setAlertMessage('Por favor, insira a data da solicitação.')
      setIsAlertOpen(true)
      return
    }

    if (!user?.id) {
      setType('warning')
      setAlertMessage('Por favor, insira o ID do usuário.')
      setIsAlertOpen(true)
      return
    }

    setIsLoadingPatient(true)

    const specialty = specialties.find((s) => s.id === specialtyId)

    if (!patientId || !specialty) {
      setType('warning')
      setAlertMessage('Paciente ou especialidade não encontrados.')
      setIsAlertOpen(true)
      setIsLoadingPatient(false)
      return
    }

    setIsLoadingPatient(false)

    const requestData = {
      specialtyId,
      patientId,
      userId: user.id,
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
      ...conditions,
    }

    try {
      const response = await api.post('/appointments', requestData)
      setType('success')
      setAlertMessage('Solicitação criada com sucesso!')
      setIsAlertOpen(true)
      console.log('Solicitação criada com sucesso!')

      // Limpar os campos
      if (response.status === 201) {
        console.log('Solicitação criada com sucesso!')
        setTimeout(() => {
          setPatientId('')
          setSpecialtyId(undefined)
          setSelectedSpecialty(null)
          setPriority('Normal')
          setAppointmentDate(new Date().toISOString().split('T')[0])
          setDiagnosis('')
          setCid('')
          setRequestingDoctor('')
          setCrm('')
          setRequestCode('')
          setStatus('InProgress')
          setNotes('')
          setConditions({
            isPregnant: false,
            hasHypertension: false,
            hasDiabetes: false,
            isBedridden: false,
            hasCourtOrder: false,
            isSuspected: false,
          })
          setType('info')
          setAlertMessage('')
          setIsAlertOpen(false)
        }, 3000)
      }
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
      setIsLoadingPatient(false)
    }
  }

  const handleSpecialtyChange = (selectedOption) => {
    setSelectedSpecialty(selectedOption)
    setSpecialtyId(selectedOption ? selectedOption.value : undefined)
  }

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient)
    setPatientId(patient.id)
  }

  const handleConditionChange = (condition: string) => {
    setConditions((prev) => ({
      ...prev,
      [condition]: !prev[condition],
    }))
  }
  return (
    <Container>
      <AdminToolbar>
        <div className="rounded p-4 flex justify-between items-center bg-blue-600 text-white">
          <div className="text-2xl font-bold flex-1 text-center">
            Cadastrar Solicitação
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
      <form onSubmit={handleSubmit} className="space-y-4">
        {isAlertOpen && <Alert type={type} message={alertMessage} />}
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-4 rounded-lg">
            <div className="text-lg font-semibold mb-2">Dados Pessoais</div>
            <div>
              <Label label="Nome do Paciente" />
              <Autocomplete
                key={selectedPatient?.id || 'new'}
                placeholder="Digite o nome do paciente"
                onSelect={handlePatientSelect}
              />
              {selectedPatient && (
                <div className="mt-2 text-sm text-gray-600">
                  <p>
                    Selecionado:{' '}
                    <span className="font-semibold text-blue-800">
                      {selectedPatient.name}
                    </span>
                  </p>
                </div>
              )}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {Object.entries({
                isPregnant: '🤰 Gestante',
                hasHypertension: '💓 Hipertensão',
                hasDiabetes: '🍬 Diabetes',
                isBedridden: '🛏️ Acamado',
                hasCourtOrder: '⚖️ Ordem Judicial',
                isSuspected: '🕵🏻‍♂ Suspeito',
              }).map(([key, label], index, array) => (
                <label
                  key={key}
                  className={`flex items-center gap-2 p-3 bg-gray-100 rounded-lg shadow-sm w-full ${
                    index === array.length - 1
                      ? 'md:col-span-1'
                      : 'md:col-span-1'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={conditions[key as keyof typeof conditions]}
                    onChange={() => handleConditionChange(key)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring focus:ring-blue-500"
                  />
                  {/* Corrigindo a disposição do emoji e do texto */}
                  <span className="text-gray-700 text-base font-medium flex gap-2 items-center">
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex-1 p-4 rounded-lg">
            <div className="text-lg font-semibold mb-2">Processo</div>
            <div className="grid grid-cols-1  gap-4">
              <div>
                <div>
                  <Label label="Especialidade" />
                  {isLoading ? (
                    <Loading />
                  ) : (
                    <CreatableSelect
                      isClearable
                      value={selectedSpecialty}
                      options={specialties.map((specialty) => ({
                        value: specialty.id,
                        label: specialty.name,
                      }))}
                      onChange={handleSpecialtyChange}
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          borderColor: state.isFocused ? '#121212' : '#d9d9d9',
                          boxShadow: state.isFocused
                            ? '0 0 0 1px #121212'
                            : 'none',
                          '&:hover': {
                            borderColor: '#121212',
                          },
                        }),
                        menu: (base) => ({
                          ...base,
                          marginTop: '0.5rem',
                          borderRadius: '0.25rem',
                          boxShadow:
                            '0 0 0 1px rgba(0, 0, 0, 0.05), 0 4px 11px rgba(0, 0, 0, 0.1)',
                        }),
                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isSelected
                            ? '#e0e0e0'
                            : 'white',
                          ':hover': {
                            backgroundColor: '#f0f0f0',
                          },
                        }),
                      }}
                    />
                  )}
                </div>
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
                  className={`rounded-md p-2 w-full ${status === 'InProgress' ? 'bg-yellow-100' : status === 'Scheduled' ? 'bg-green-100' : 'bg-red-100'}`}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="InProgress" className="bg-yellow-100">
                    Em Andamento
                  </option>
                  <option value="Scheduled" className="bg-green-100">
                    Agendado
                  </option>
                  <option value="Completed" className="bg-red-100">
                    Finalizado
                  </option>
                </select>
                <Label label="Data do Agendamento" />
                <Input
                  disabled
                  type="date"
                  name="appointmentDate"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                />
                <Label label="Prioridade" />
                <select
                  name="priority"
                  id="priority"
                  className="border rounded-md p-2 w-full"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="Normal">Normal</option>
                  <option value="Elderly">Idoso</option>
                  <option value="Emergency">Urgencia</option>
                  <option value="Pregnant">Gestante</option>
                  <option value="Child">Criança</option>
                </select>
                <Label label="Observações" />
                <textarea
                  name="notes"
                  id="notes"
                  cols={30}
                  rows={6}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Observações"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button>
            {isLoadingPatient ? (
              <Loading />
            ) : (
              <div className=" bg-blue-500 text-white hover:bg-blue-700 py-2 px-8 rounded flex items-center gap-2 cursor-pointer">
                <CiFloppyDisk size={24} fill="white" />
                Salvar
              </div>
            )}
          </button>
        </div>
      </form>
    </Container>
  )
}
