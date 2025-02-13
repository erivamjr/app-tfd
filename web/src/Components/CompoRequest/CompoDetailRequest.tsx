import { useNavigate, useParams } from 'react-router-dom'
import AdminToolbar from '../Ux/AdminToolbar/AdminToolbar'
import { ImPrinter } from 'react-icons/im'
import { IoReturnDownBack } from 'react-icons/io5'
import Container from '../Ux/Container/Container'
import DisplayMessage from '../Ux/DisplayMessage/DisplayMessage'
import { useEffect, useState } from 'react'
import api from '../../Api'
import { TypeAppointment } from '../Hooks/Api/Appointments/TypeAppointments'

export default function CompoDetailsRequest() {
  const { id } = useParams<{ id: string }>()
  const [appointment, setAppointment] = useState<TypeAppointment | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    api
      .get(`/appointments/${id}`)
      .then((response) => {
        setAppointment(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id])

  if (!appointment) {
    return <DisplayMessage message="Agendamento não encontrado." />
  }
  const appointmentDate = new Date(appointment.createdAt)
  const formattedDate = appointmentDate.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  const handleGoBack = () => {
    navigate(-1)
  }

  const { patient } = appointment
  return (
    <div>
      <AdminToolbar>
        <div className="rounded p-4 flex justify-between items-center bg-blue-600 text-white">
          <div className="text-2xl font-bold flex-1 text-center">
            Detalhes da Solicitação
          </div>
          <div className="flex gap-3">
            <button className="bg-white text-blue-600 p-3 rounded shadow-md hover:bg-gray-100">
              <ImPrinter />
            </button>
            <button
              className="bg-white text-blue-600 p-3 rounded shadow-md hover:bg-gray-100"
              onClick={handleGoBack}
            >
              <IoReturnDownBack />
            </button>
          </div>
        </div>
      </AdminToolbar>

      <Container>
        <section>
          <div className="p-1 font-bold text-black text-lg">Dados Pessoais</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2">
            <div className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-lg">
              <p className="text-gray-800 font-semibold">
                Nome:{' '}
                <span className="text-gray-700 font-normal">
                  {patient.name}
                </span>
              </p>
              <p className="text-gray-800 font-semibold">
                Gênero:{' '}
                <span className="text-gray-700 font-normal">
                  {patient.gender}
                </span>
              </p>
              <p className="text-gray-800 font-semibold">
                CPF:{' '}
                <span className="text-gray-700 font-normal">{patient.cpf}</span>
              </p>
              <p className="text-gray-800 font-semibold">
                RG:{' '}
                <span className="text-gray-700 font-normal">{patient.rg}</span>
              </p>
              <p className="text-gray-800 font-semibold">
                Cartão SUS:{' '}
                <span className="text-gray-700 font-normal">
                  {patient.susCard}
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-lg">
              <p className="text-gray-800 font-semibold">
                Telefone:{' '}
                <span className="text-gray-700 font-normal">
                  {patient.phone}
                </span>
              </p>
              <p className="text-gray-800 font-semibold">
                Mãe:{' '}
                <span className="text-gray-700 font-normal">
                  {patient.motherName}
                </span>
              </p>
              <p className="text-gray-800 font-semibold">
                Logradouro:{' '}
                <span className="text-gray-700 font-normal">
                  {patient.address}
                </span>
              </p>
              <p className="text-gray-800 font-semibold">
                Bairro:{' '}
                <span className="text-gray-700 font-normal">
                  {patient.district}
                </span>
              </p>
              <p className="text-gray-800 font-semibold">
                Estado:{' '}
                <span className="text-gray-700 font-normal">
                  {patient.state}
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-lg">
              <p className="text-gray-800 font-semibold">
                CEP:{' '}
                <span className="text-gray-700 font-normal">
                  {patient.zipCode}
                </span>
              </p>
              <p className="text-gray-800 font-semibold">
                Número:{' '}
                <span className="text-gray-700 font-normal">
                  {patient.number}
                </span>
              </p>
              <p className="text-gray-800 font-semibold">
                Complemento:{' '}
                <span className="text-gray-700 font-normal">
                  {patient.complement}
                </span>
              </p>
            </div>
          </div>

          <div className="p-1 text-black font-bold text-lg">
            Detalhes do Agendamento
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2">
            <div className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-lg">
              <p className="text-gray-800 font-semibold">
                Especialidade:{' '}
                <span className="text-gray-700 font-normal">
                  {appointment.specialty.name}
                </span>
              </p>
              <p className="text-gray-800 font-semibold">
                Prioridade:{' '}
                <span className="text-gray-700 font-normal">
                  {appointment.priority}
                </span>
              </p>
              <p className="text-gray-800 font-semibold">
                CID:{' '}
                <span className="text-gray-700 font-normal">
                  {appointment.cid}
                </span>
              </p>
              <p className="text-gray-800 font-semibold">
                Diagnóstico:{' '}
                <span className="text-gray-700 font-normal">
                  {appointment.diagnosis}
                </span>
              </p>
              <p className="text-gray-800 font-semibold">
                Status:{' '}
                <span className="text-gray-700 font-normal">
                  {appointment.status}
                </span>
              </p>
              <p className="text-gray-800 font-semibold">
                Gestante:{' '}
                <span className="text-gray-700 font-normal">
                  {appointment.isPregnant ? 'Sim' : 'Não'}
                </span>
              </p>
              <p className="text-gray-800 font-semibold">
                Hipertenção:{' '}
                <span className="text-gray-700 font-normal">
                  {appointment.hasHypertension ? 'Sim' : 'Não'}
                </span>
              </p>
              <p className="text-gray-800 font-semibold">
                Diabete:{' '}
                <span className="text-gray-700 font-normal">
                  {appointment.hasDiabetes ? 'Sim' : 'Não'}
                </span>
              </p>
              <p className="text-gray-800 font-semibold">
                Acamdado:{' '}
                <span className="text-gray-700 font-normal">
                  {appointment.isBedridden ? 'Sim' : 'Não'}
                </span>
              </p>
              <p className="text-gray-800 font-semibold">
                Ordem Judicial:{' '}
                <span className="text-gray-700 font-normal">
                  {appointment.hasCourtOrder ? 'Sim' : 'Não'}
                </span>
              </p>
              <p className="text-gray-800 font-semibold">
                Suspeito:{' '}
                <span className="text-gray-700 font-normal">
                  {appointment.isSuspected ? 'Sim' : ' Não'}
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-lg">
              <p className="text-gray-800 font-semibold">
                Médico:{' '}
                <span className="text-gray-700 font-normal">
                  {appointment.requestingDoctor}
                </span>
              </p>
              <p className="text-gray-800 font-semibold">
                CRM:{' '}
                <span className="text-gray-700 font-normal">
                  {appointment.crm}
                </span>
              </p>
              <p className="text-gray-800 font-semibold">
                Código de Solicitação:{' '}
                <span className="text-gray-700 font-normal">
                  {appointment.requestCode}
                </span>
              </p>
              <p className="text-gray-800 font-semibold">
                Data da Solicitação:{' '}
                <span className="text-gray-700 font-normal">
                  {formattedDate}
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-lg">
              <p className="text-gray-800 font-semibold">
                Usuário de Solicitação:{' '}
                <span className="text-gray-700 font-normal">
                  {appointment?.user?.name}
                </span>
              </p>
              <p className="text-gray-800 font-semibold bg-yellow-100 p-2 rounded-md">
                Observação: {appointment.notes}
              </p>
            </div>
          </div>
        </section>
      </Container>
    </div>
  )
}
