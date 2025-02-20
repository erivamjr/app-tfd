import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../Components/Ux/Input/Input'
import MaskedInput from '../Ux/Input/MaskedInput'
import Logo from '../../Components/Ux/Logo/Vector.png'
import api from '../../Api'
import axios from 'axios'
import { useToast } from '../Context/ToastContext'
import { LoaderIcon } from '../../assets/Icon'

const createAccountSchema = z
  .object({
    name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
    email: z.string().email('Digite um e-mail válido'),
    cpf: z
      .string()
      .min(14, 'O CPF deve ter 11 caracteres')
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
    phone: z
      .string()
      .min(15, 'O telefone deve ter 10 caracteres')
      .regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'Número inválido'),
    workLocation: z.string().min(3, 'Local de trabalho obrigatório'),
    password: z
      .string()
      .min(8, 'A senha deve ter pelo menos 8 caracteres')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
        'A senha deve conter pelo menos uma letra minúscula, uma maiúscula, um número e um caractere especial',
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type CreateAccountFormData = z.infer<typeof createAccountSchema>

export default function CompoCreateAccount() {
  const { showSuccess, showError } = useToast()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createAccountSchema),
    mode: 'onChange',
  })

  const handleCreateAccount = async (data: CreateAccountFormData) => {
    const payload = {
      name: data.name,
      email: data.email,
      cpf: data.cpf,
      phone: data.phone,
      workLocation: data.workLocation,
      password: data.password,
    }
    try {
      await api.post('/auth/register', payload)
      showSuccess('Conta criada com sucesso!')
      navigate('/auth/login')
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        showError(error.response.data?.message || 'Erro ao criar a conta')
      }
    }
  }

  return (
    <div className="relative min-h-screen bg-gray-100">
      <div className="absolute z-10 h-screen w-full sm:w-1/2 bg-blue-500 flex items-center justify-center"></div>
      <div className="relative z-20 flex items-center justify-center min-h-screen">
        <div className="flex w-full sm:w-[800px] shadow-lg flex-col sm:flex-row">
          <div className="flex mb-10 items-center justify-center w-full sm:w-1/2 bg-blue-500">
            <img src={Logo} alt="Logo" className="w-48 h-48 rounded-md" />
          </div>
          <div className="flex flex-col z-30 items-center justify-center w-full sm:w-1/2 px-10 py-10 bg-white">
            <h2 className="mb-6 text-2xl font-bold">Criar Conta</h2>
            <form
              onSubmit={handleSubmit(handleCreateAccount)}
              className="w-full"
            >
              <div className="space-y-2">
                <label className="block text-sm font-medium">Nome</label>
                <Input
                  type="text"
                  {...register('name')}
                  placeholder="Digite seu nome"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Email</label>
                <Input
                  type="text"
                  {...register('email')}
                  placeholder="Digite seu email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">CPF</label>
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

              <div className="space-y-2">
                <label className="block text-sm font-medium">Telefone</label>
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

              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Local de Trabalho
                </label>
                <Input
                  type="text"
                  {...register('workLocation')}
                  placeholder="Digite seu local de trabalho"
                />
                {errors.workLocation && (
                  <p className="text-red-500 text-sm">
                    {errors.workLocation.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Senha</label>
                <Input
                  {...register('password')}
                  type="password"
                  placeholder="Digite sua senha"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Confirme a Senha
                </label>
                <Input
                  {...register('confirmPassword')}
                  type="password"
                  placeholder="Confirme sua senha"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="w-full py-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 py-2 px-8 rounded-md text-white hover:bg-blue-700 duration-300 w-full sm:w-auto flex items-center justify-center"
                >
                  {isSubmitting && (
                    <span className=" mr-2">
                      <LoaderIcon className="w-5 h-5 animate-spin" />
                    </span>
                  )}
                  Cadastrar
                </button>
              </div>
            </form>

            <Link to="/auth?mode=login" className="my-2 text-sm text-gray-500">
              Já tem uma conta? Entrar
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
