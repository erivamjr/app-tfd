import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../Components/Ux/Input/Input'
import Logo from '../../Components/Ux/Logo/Vector.png'
import MaskedInput from '../Ux/Input/MaskedInput'
import api from '../../Api'
import axios from 'axios'
import { useToast } from '../Context/ToastContext'

// Definindo o schema de validação com Zod
const createAccountSchema = z
  .object({
    name: z
      .string({ required_error: 'O nome é obrigatório' })
      .min(3, 'O nome deve ter pelo menos 3 caracteres'),
    email: z
      .string({ required_error: 'O e-mail é obrigatório' })
      .email('Digite um e-mail válido'),
    cpf: z
      .string({ required_error: 'O CPF é obrigatório' })
      .min(11, 'O CPF deve ter 11 caracteres'),
    phone: z
      .string({ required_error: 'O telefone é obrigatório' })
      .min(10, 'O telefone deve ter pelo menos 10 dígitos'),
    workLocation: z
      .string({ required_error: 'Local de trabalho obrigatório' })
      .min(3, 'Local de trabalho obrigatório'),
    password: z
      .string({ required_error: 'A senha é obrigatória' })
      .min(8, 'A senha deve ter pelo menos 8 caracteres')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
        'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um caractere especial',
      ),
    confirmPassword: z.string({ required_error: 'Confirme sua senha' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type CreateAccountData = z.infer<typeof createAccountSchema>

export default function CompoCreateAccount() {
  const { showSuccess, showError } = useToast()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateAccountData>({
    resolver: zodResolver(createAccountSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      cpf: '',
      phone: '',
      workLocation: '',
      password: '',
      confirmPassword: '',
    },
  })

  const handleCreateAccount = async (data: CreateAccountData) => {
    const payload = {
      name: data.name,
      email: data.email,
      cpf: data.cpf,
      phone: data.phone,
      workLocation: data.workLocation,
      password: data.password,
    }

    try {
      const response = await api.post('/auth/register', payload)

      if (response.status === 201) {
        showSuccess('Conta criada com sucesso!')
        navigate('/auth/login')
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.message || 'Erro ao criar a conta'
        showError(errorMessage)
      }
    }
  }
  return (
    <div className="relative min-h-screen bg-gray-100">
      <div className="absolute z-10 h-screen w-full sm:w-1/2 bg-blue-500 flex items-center justify-center"></div>
      <div className="relative z-20 flex items-center justify-center min-h-screen">
        <div className="flex w-full sm:w-[800px] shadow-lg flex-col sm:flex-row">
          <div className="flex mb-10 items-center justify-center w-full sm:w-1/2 bg-blue-500">
            <img
              src={Logo}
              alt="Logo"
              className="w-48 h-48 rounded-md"
              width="200"
              height="200"
            />
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
                <label className="block text-sm font-medium my-2">Email</label>
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
                <label className="block text-sm font-medium my-2">CPF</label>
                <MaskedInput
                  mask="999.999.999-99"
                  type="text"
                  placeholder="Digite seu CPF"
                  {...register('cpf')}
                />
                {errors.cpf && (
                  <p className="text-red-500 text-sm">{errors.cpf.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium my-2">
                  Telefone
                </label>
                <MaskedInput
                  mask="(99) 99999-9999"
                  type="text"
                  placeholder="Digite seu telefone"
                  {...register('phone')}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium my-2">
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
                <label className="block text-sm font-medium my-2">Senha</label>
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
                <label className="block text-sm font-medium my-2">
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
                  className="bg-blue-500 py-2 my-2 px-8 rounded-md text-white hover:bg-blue-700 duration-300 w-full sm:w-auto flex items-center justify-center"
                >
                  {isSubmitting && (
                    <svg
                      className="animate-spin h-5 w-5 text-white mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
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
