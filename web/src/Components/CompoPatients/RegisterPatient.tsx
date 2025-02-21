import { AxiosError } from 'axios'
import { CiFloppyDisk } from 'react-icons/ci'
import { IoReturnDownBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

import api from '../../Api'
import Label from '../Ux/Label/Label'
import Input from '../Ux/Input/Input'
import AdminToolbar from '../Ux/AdminToolbar/AdminToolbar'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { SelectReact } from '../Ux/Input/SelectReact'
import { genderOptions, brazilStates } from '../../utils/utils'
import { useToast } from '../Context/ToastContext'
import MaskedInput from '../Ux/Input/MaskedInput'
import { LoaderIcon } from '../../assets/Icon'

const schemaPatient = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  cpf: z
    .string()
    .min(14, 'O CPF deve ter 11 caracteres')
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
  rg: z.string().min(6, 'O RG deve ter 9 caracteres'),
  phone: z
    .string()
    .min(15, 'O telefone deve ter 10 caracteres')
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'Número inválido'),
  gender: z.string().min(1, 'O sexo deve ter pelo menos 1 caractere'),
  susCard: z.string().min(1, 'O cartão SUS deve ter pelo menos 1 caractere'),
  birthDate: z
    .string()
    .min(1, 'A data de nascimento deve ter pelo menos 1 caractere'),
  motherName: z
    .string()
    .min(1, 'O nome da mae deve ter pelo menos 1 caractere'),
  address: z.string().min(1, 'O endereço deve ter pelo menos 1 caractere'),
  number: z.string().min(1, 'O número deve ter pelo menos 1 caractere'),
  complement: z.string(),
  state: z.string().min(1, 'O estado deve ter pelo menos 1 caractere'),
  district: z.string().min(1, 'O bairro deve ter pelo menos 1 caractere'),
  city: z.string().min(1, 'A cidade deve ter pelo menos 1 caractere'),
  zipCode: z.string().min(1, 'O CEP deve ter pelo menos 1 caractere'),
})

type PatientFormData = z.infer<typeof schemaPatient>

export default function RegisterPatients() {
  const { showSuccess, showError } = useToast()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
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
      state: 'PA',
      district: '',
      city: 'Portel',
      zipCode: '68480-000',
    },
  })

  async function handleSubmitPatient(data: PatientFormData) {
    try {
      await api.post('patients', { ...data, active: true })

      showSuccess('Paciente cadastrado com sucesso!')
      reset()
      navigate('/patients')
      handleResetFields()
    } catch (error) {
      const axiosError = error as AxiosError
      console.error('Erro ao registrar o paciente:', axiosError)
      const { status } = axiosError.request

      if (status === 409) {
        showError('Paciente já cadastrado!')
      }
    }
  }

  function handleResetFields() {
    console.log('handleResetFields')
  }

  return (
    <div className="shadow-lg mt-2 border-gray-800 p-3 bg-white">
      <AdminToolbar>
        <div className="rounded p-4 flex justify-between items-center bg-blue-600 text-white">
          <div className="text-2xl font-bold flex-1 text-center">
            Cadastrar Paciente
          </div>
          <div className="flex gap-3">
            <button
              className="bg-white text-blue-600 p-3 rounded shadow-md hover:bg-gray-100"
              onClick={() => navigate('/patients')}
            >
              <IoReturnDownBack />
            </button>
          </div>
        </div>
      </AdminToolbar>
      <form onSubmit={handleSubmit(handleSubmitPatient)} className="space-y-4">
        <div className="w-full flex flex-wrap md:flex-nowrap">
          <div className="flex-1 p-3">
            <h2 className="text-bold text-xl pb-2">Dados Pessoais</h2>
            <div className="space-y-4">
              <Label label="Nome Completo" />
              <Input
                type="text"
                {...register('name')}
                placeholder="Digite o nome completo"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                    <p className="text-red-500 text-sm">
                      {errors.gender.message}
                    </p>
                  )}
                </div>
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
                  <Label label="Cartão do SUS" />
                  <Input
                    type="text"
                    {...register('susCard')}
                    placeholder="Digite o cartão SUS"
                  />
                  {errors.susCard && (
                    <p className="text-red-500 text-sm">
                      {errors.susCard.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label label="Nome da Mãe" />
                  <Input
                    type="text"
                    {...register('motherName')}
                    placeholder="Digite o nome da mãe"
                  />
                  {errors.motherName && (
                    <p className="text-red-500 text-sm">
                      {errors.motherName.message}
                    </p>
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
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
              <h2 className="text-bold text-xl pb-2">Endereço</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <Label label="Endereço" />
                  <Input
                    type="text"
                    {...register('address')}
                    placeholder="Digite o endereço"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">
                      {errors.address.message}
                    </p>
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
                    <p className="text-red-500 text-sm">
                      {errors.number.message}
                    </p>
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
                    <p className="text-red-500 text-sm">
                      {errors.city.message}
                    </p>
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
                    <p className="text-red-500 text-sm">
                      {errors.state.message}
                    </p>
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
                    <p className="text-red-500 text-sm">
                      {errors.zipCode.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="bg-blue-500 text-white hover:bg-blue-700 py-2 px-8 rounded flex items-center gap-2 cursor-pointer">
                <span className=" mr-2">
                  <LoaderIcon className="w-5 h-5 animate-spin" />
                </span>
                Salvar
              </div>
            ) : (
              <div className="bg-blue-500 text-white hover:bg-blue-700 py-2 px-8 rounded flex items-center gap-2 cursor-pointer">
                <CiFloppyDisk size={24} fill="white" />
                Salvar
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
