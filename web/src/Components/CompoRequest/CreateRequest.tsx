import { CiFloppyDisk } from 'react-icons/ci'
import { RiUserAddLine } from 'react-icons/ri'
import Input from '../Ux/Input/Input'
import Label from '../Ux/Label/Label'
import Loading from '../Ux/Loading/Loading'
import Modal from '../Ux/Modal/Modal'
import { FormEvent, useEffect, useState } from 'react'
import api from '../../Api'
import useSpecialties from '../Hooks/Api/Specialties/Specialties'
import Alert from '../Ux/Alert/Alert'
import { Patient } from '../Hooks/Api/Patiens/TypePatiens'
import CreatableSelect from 'react-select/creatable'

export default function CreateRequest() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isLoadingPatient, setIsLoadingPatient] = useState<boolean>(false)
  const { specialties, isLoading } = useSpecialties()
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
  const [search, setSearch] = useState<string>('')
  const [suggestedPatients, setSuggestedPatients] = useState<Patient[]>([])
  const [isSearching, setIsSearching] = useState(false)
  function handleOpenModal() {
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!suggestedPatients[0].id) {
      setType('warning')
      setAlertMessage('Por favor, selecione uma especialidade.')
      setIsAlertOpen(true)
      return
    }

    if (!suggestedPatients[0].name) {
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

    if (!userId) {
      setType('warning')
      setAlertMessage('Por favor, insira o ID do usuário.')
      setIsAlertOpen(true)
      return
    }

    setIsLoadingPatient(true)
    console.log(suggestedPatients)

    const specialty = specialties.find((s) => s.id === specialtyId)
    console.log(specialty)

    if (!suggestedPatients[0] || !specialty) {
      setType('warning')
      setAlertMessage('Paciente ou especialidade não encontrados.')
      setIsAlertOpen(true)
      setIsLoadingPatient(false)
      return
    }

    setIsLoadingPatient(false)

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
    console.log(requestData)

    try {
      await api.post('/appointments', requestData)
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
      setIsLoadingPatient(false)
    }
  }

  const searchPatients = async (searchTerm) => {
    try {
      setIsSearching(true)
      const response = await api.get<Patient[]>(
        `/patients/search?name=${searchTerm}`,
      )
      setSuggestedPatients(response.data)
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error)
    } finally {
      setIsSearching(false)
    }
  }
  console.log('suggestedPatients', suggestedPatients)
  useEffect(() => {
    if (search.length > 0) {
      searchPatients(search)
    } else {
      setSuggestedPatients([])
    }
  }, [search])

  const handleSpecialtyChange = (selectedOption) => {
    // setSelectedSpecialty(selectedOption)
    // Você pode querer definir specialtyId com base no valor selecionado
    setSpecialtyId(selectedOption ? selectedOption.value : undefined)
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
                <Input
                  type="text"
                  name="search"
                  value={search}
                  placeholder="Pesquisar"
                  required={false}
                  onChange={(e) => {
                    setSearch(e.target.value)
                  }}
                  list="patients-list"
                />
                {/* Lista de pacientes sugeridos */}
                {isSearching ? (
                  <div className="text-center text-white bg-blue-500 p-2 mt-2">
                    Loading...
                  </div>
                ) : suggestedPatients.length > 0 ? (
                  <datalist id="patients-list" className="w-full">
                    {suggestedPatients.map((patient) => (
                      <option key={patient.id} value={patient.name}>
                        {patient.name}
                      </option>
                    ))}
                  </datalist>
                ) : (
                  search && (
                    <div className="text-center text-gray-500 mt-2">
                      Nenhum paciente encontrado.
                    </div>
                  )
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
            </div>
            <div className="flex-1 p-4 rounded-lg">
              <div className="text-lg font-semibold mb-2">Processo</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div>
                    <Label label="Especialidade" />
                    {isLoading ? (
                      <Loading />
                    ) : (
                      <CreatableSelect
                        isClearable
                        options={specialties.map((specialty) => ({
                          value: specialty.id,
                          label: specialty.name,
                        }))}
                        onChange={handleSpecialtyChange}
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            borderColor: state.isFocused
                              ? '#121212'
                              : '#d9d9d9',
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
                    className="rounded-md p-2 w-full"
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
      </Modal>
      <div className="flex justify-end p-3 space-x-4">
        <div
          onClick={handleOpenModal}
          className="bg-blue-600 text-white hover:bg-blue-500 p-3 rounded flex items-center space-x-2 cursor-pointer"
        >
          <span className="hidden md:block">Adicionar Solicitação</span>
          <RiUserAddLine />
        </div>
      </div>
    </div>
  )
}
