import { useNavigate, useParams } from 'react-router-dom'
import AdminToolbar from '../Ux/AdminToolbar/AdminToolbar'
import { ImPrinter } from 'react-icons/im'
import { IoReturnDownBack } from 'react-icons/io5'
import Container from '../Ux/Container/Container'
import DetailsTable from './DetailsTable'
import DisplayMessage from '../Ux/DisplayMessage/DisplayMessage'
import { useState, useEffect } from 'react'
import api from '../../Api'
import {
  PatientProps,
  TypeAppointment,
  UserProps,
} from '../Hooks/Api/Appointments/TypeAppointments'

export default function DetailsPatients() {
  const { id } = useParams<{ id: string }>()

  const [patient, setPatient] = useState<PatientProps>()
  const [appointments, setAppointments] = useState<TypeAppointment[]>()
  const [user, setUser] = useState<UserProps>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        setIsLoading(true)
        const response = await api.get(
          `/appointments/filtered?patientId=${id}&limit=20&orderBy=createdAt&orderDirection=desc`,
        )

        const { data } = response.data

        if (data.length !== 0) {
          setAppointments(data)

          setPatient(data[0]?.patient)

          setUser(data[0]?.user)
        } else {
          const response = await api.get(`/patients/${id}`)

          setPatient(response?.data)
          setUser(response?.data?.user)
        }
      } catch (error) {
        console.error('Erro ao buscar paciente:', error)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPatient()
  }, [id])

  if (isLoading)
    return <DisplayMessage message={'Carregando'} color="green" text="white" />

  if (isError)
    return (
      <DisplayMessage
        message={'Erro na solicitação.'}
        color="red"
        text="white"
      />
    )

  if (!patient)
    return (
      <DisplayMessage message={'Nenhum paciente localizado'} text="orange" />
    )

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div>
      <AdminToolbar>
        <div className="p-2 flex">
          <div className="font-bold text-black text-2xl flex flex-1 items-center justify-center">
            Detalhes do Paciente
          </div>
          <div className="flex gap-3">
            <div className="bg-blue-600 text-white p-3 text-2xl rounded">
              <ImPrinter />
            </div>
            <div
              className="bg-blue-600 text-white p-3 text-2xl rounded cursor-pointer"
              onClick={handleGoBack}
            >
              <IoReturnDownBack />
            </div>
          </div>
        </div>
      </AdminToolbar>
      <Container>
        <section>
          <div className="p-1 font-bold text-black">Dados Pessoais</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full p-1 gap-4">
            <div className="flex flex-col gap-2 p-4 rounded-lg shadow-lg">
              <p className="text-gray-800 font-semibold">
                Nome:{' '}
                <span className="text-gray-700 font-normal">
                  {patient.name}
                </span>
              </p>
              <p className="text-gray-800 font-semibold">
                Sexo:{' '}
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
                Data de Nasc.:{' '}
                <span className="text-gray-700 font-normal">
                  {patient.birthDate
                    ? new Date(patient.birthDate).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })
                    : 'Não informado'}
                </span>
              </p>
              <p className="text-gray-800 font-semibold">
                Cartão SUS:{' '}
                <span className="text-gray-700 font-normal">
                  {patient.susCard}
                </span>
              </p>
              <p className="text-gray-800 font-semibold">
                Mãe:{' '}
                <span className="text-gray-700 font-normal">
                  {patient.motherName}
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-2 p-4 rounded-lg shadow-lg">
              <p className="text-gray-800 font-semibold">
                Telefone:{' '}
                <span className="text-gray-700 font-normal">
                  {patient.phone}
                </span>
              </p>
              <p className="text-gray-800 font-semibold">
                Logradouro:{' '}
                <span className="text-gray-700 font-normal">
                  {`${patient.address}, ${patient.number ?? 'S/N'}`}
                </span>
              </p>
              <p className="text-gray-800 font-semibold">
                Complemento:{' '}
                <span className="text-gray-700 font-normal">
                  {patient.complement}
                </span>
              </p>
              <p className="text-gray-800 font-semibold">
                Bairro:{' '}
                <span className="text-gray-700 font-normal">
                  {patient.district}
                </span>
              </p>
              <p className="text-gray-800 font-semibold">
                Cidade:{' '}
                <span className="text-gray-700 font-normal">
                  {patient.city}
                </span>
              </p>
              <p className="text-gray-800 font-semibold">
                Estado:{' '}
                <span className="text-gray-700 font-normal">
                  {patient.state}
                </span>
              </p>
              <p className="text-gray-800 font-semibold">
                CEP:{' '}
                <span className="text-gray-700 font-normal">
                  {patient.zipCode}
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-2 p-4 rounded-lg shadow-lg">
              <p className="text-gray-800 font-semibold">
                Cadastrado por:{' '}
                <span className="text-gray-700 font-normal">{user?.name}</span>
              </p>
              <p className="text-gray-800 font-semibold">
                Local:{' '}
                <span className="text-gray-700 font-normal">
                  {user?.workLocation}
                </span>
              </p>

              <p className="text-gray-800 font-semibold">
                Data de Cadastro:{' '}
                <span className="text-gray-700 font-normal">
                  {new Date(patient.createdAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </span>
              </p>
              <p className="text-gray-800 font-semibold">
                Data de Atualizado:{' '}
                <span className="text-gray-700 font-normal">
                  {new Date(patient.updatedAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </span>
              </p>
              <p className="text-gray-800 font-semibold">
                Ativo:{' '}
                <span className="text-gray-700 font-normal">
                  {patient.active ? 'Sim' : 'Não'}
                </span>
              </p>
            </div>
          </div>

          <div className="p-1 text-black font-bold">Histórico</div>
        </section>
        <DetailsTable
          item={appointments ?? []}
          isErrorPoint={isError}
          isLoadingPoint={isLoading}
        />
      </Container>
    </div>
  )
}
