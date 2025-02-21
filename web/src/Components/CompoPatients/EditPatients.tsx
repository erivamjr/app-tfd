import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Input from '../Ux/Input/Input'
import Alert from '../Ux/Alert/Alert'
import Container from '../Ux/Container/Container'
import AdminToolbar from '../Ux/AdminToolbar/AdminToolbar'
import { IoReturnDownBack } from 'react-icons/io5'
import Label from '../Ux/Label/Label'
import api from '../../Api'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { PatientFormData, schemaPatient } from '../../schema/patient.chema'
import { brazilStates, genderOptions } from '../../utils/utils'
import { SelectReact } from '../Ux/Input/SelectReact'
import MaskedInput from '../Ux/Input/MaskedInput'
import { format, parseISO } from 'date-fns'
import { useToast } from '../Context/ToastContext'

export default function EditPatient() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { showError, showSuccess } = useToast()
  const [patient, setPatient] = useState<PatientFormData>()
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PatientFormData>({
    resolver: zodResolver(schemaPatient),
    mode: 'onChange',
    defaultValues: {
      name: '',
      cpf: '',
      rg: '',
      phone: '',
      gender: '',
      susCard: '',
      birthDate: '',
      motherName: '',
      address: '',
      number: '',
      complement: '',
      state: '',
      district: '',
      city: '',
      zipCode: '',
    },
  })

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await api.get(`/patients/${id}`)
        setPatient(response.data)
      } catch (error) {
        console.error('Erro ao buscar paciente:', error)
        showError('Erro ao buscar paciente')
      }
    }
    fetchPatient()
  }, [id, showError])

  useEffect(() => {
    if (patient) {
      reset({
        name: patient.name,
        cpf: patient.cpf,
        rg: patient.rg,
        phone: patient.phone,
        gender: patient.gender,
        susCard: patient.susCard,
        birthDate: patient.birthDate
          ? format(parseISO(patient.birthDate), 'yyyy-MM-dd')
          : '',
        motherName: patient.motherName,
        address: patient.address,
        number: patient.number,
        complement: patient.complement,
        state: patient.state,
        district: patient.district,
        city: patient.city,
        zipCode: patient.zipCode,
      })
    }
  }, [patient, reset])

  const handleSubmitPatient = async (data: PatientFormData) => {
    try {
      await api.patch(`/patients/${id}`, data)
      showSuccess('Paciente atualizado com sucesso')
      navigate('/patients')
    } catch (error) {
      console.error('Erro ao atualizar paciente:', error)
      showError('Erro ao atualizar o paciente')
    }
  }

  if (isSubmitting) {
    return <Alert type="info" message="Salvando alterações..." />
  }

  if (!patient) {
    return <Alert type="info" message="Carregando paciente..." />
  }

  return (
    <div>
      <AdminToolbar>
        <div className="p-4 flex justify-between items-center bg-blue-600 text-white rounded">
          <div className="text-2xl font-bold flex-1 text-center">
            Editar Paciente
          </div>
          <div className="flex gap-3">
            <button
              className="bg-white text-blue-600 p-3 rounded shadow-md hover:bg-gray-100"
              onClick={() => navigate(-1)}
            >
              <IoReturnDownBack />
            </button>
          </div>
        </div>
      </AdminToolbar>

      <Container>
        <form
          onSubmit={handleSubmit(handleSubmitPatient)}
          className="grid gap-2 p-5"
        >
          <Label label="Nome" />
          <Input
            type="text"
            {...register('name')}
            placeholder="Digite o nome completo"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
          <div className="md:grid grid-cols-3 gap-2">
            <div>
              <Label label="CPF" />
              <Controller
                name="cpf"
                control={control}
                render={({ field }) => (
                  <MaskedInput {...field} mask="999.999.999-99" />
                )}
              />
              {errors.cpf && (
                <p className="text-red-500 text-sm">{errors.cpf.message}</p>
              )}
            </div>

            <div>
              <Label label="RG" />
              <Input
                type="text"
                {...register('rg')}
                placeholder="Digite o RG"
              />
              {errors.rg && (
                <p className="text-red-500 text-sm">{errors.rg.message}</p>
              )}
            </div>
            <div>
              <Label label="Data de Nascimento" />
              <Input
                type="date"
                {...register('birthDate')}
                placeholder="Data de Nascimento"
              />
              {errors.birthDate && (
                <p className="text-red-500 text-sm">
                  {errors.birthDate.message}
                </p>
              )}
            </div>
          </div>

          <div className="md:grid grid-cols-3 gap-2">
            <div>
              <Label label="Número do SUS" />
              <Input
                type="text"
                {...register('susCard')}
                placeholder="Digite o cartão SUS"
              />
              {errors.susCard && (
                <p className="text-red-500 text-sm">{errors.susCard.message}</p>
              )}
            </div>

            <div>
              <Label label="Telefone" />
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <MaskedInput {...field} mask="(99) 99999-9999" />
                )}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <Label label="Gênero" />
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <SelectReact
                    options={genderOptions}
                    placeholder="Selecione o gênero"
                    selected={field.value}
                    handleChange={(option) => field.onChange(option?.value)}
                  />
                )}
              />

              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender.message}</p>
              )}
            </div>
          </div>

          <Label label="Nome da Mãe" />
          <Input
            type="text"
            {...register('motherName')}
            placeholder="Digite o nome da mãe"
          />
          {errors.motherName && (
            <p className="text-red-500 text-sm">{errors.motherName.message}</p>
          )}

          <div className="md:grid grid-cols-5 gap-2">
            <div className="col-span-3">
              <Label label="Endereço" />
              <Input
                type="text"
                {...register('address')}
                placeholder="Digite o endereço"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>
            <div>
              <Label label="Número" />
              <Input
                type="text"
                {...register('number')}
                placeholder="Digite o número"
              />
              {errors.number && (
                <p className="text-red-500 text-sm">{errors.number.message}</p>
              )}
            </div>
            <div>
              <Label label="Complemento" />
              <Input
                type="text"
                {...register('complement')}
                placeholder="Digite o complemento"
              />
              {errors.complement && (
                <p className="text-red-500 text-sm">
                  {errors.complement.message}
                </p>
              )}
            </div>
          </div>

          <div className="md:grid grid-cols-4 gap-2">
            <div>
              <Label label="Bairro" />
              <Input
                type="text"
                {...register('district')}
                placeholder="Digite o bairro"
              />
              {errors.district && (
                <p className="text-red-500 text-sm">
                  {errors.district.message}
                </p>
              )}
            </div>

            <div>
              <Label label="Cidade" />
              <Input
                type="text"
                {...register('city')}
                placeholder="Digite a cidade"
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}
            </div>

            <div>
              <Label label="Estado" />
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <SelectReact
                    options={brazilStates}
                    placeholder="Selecione o gênero"
                    selected={field.value}
                    handleChange={(option) => field.onChange(option?.value)}
                  />
                )}
              />
              {errors.state && (
                <p className="text-red-500 text-sm">{errors.state.message}</p>
              )}
            </div>

            <div>
              <Label label="CEP" />
              <Input
                type="text"
                {...register('zipCode')}
                placeholder="Digite o CEP"
              />
              {errors.zipCode && (
                <p className="text-red-500 text-sm">{errors.zipCode.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
            disabled={isSubmitting}
          >
            Salvar Alterações
          </button>
        </form>
      </Container>
    </div>
  )
}
