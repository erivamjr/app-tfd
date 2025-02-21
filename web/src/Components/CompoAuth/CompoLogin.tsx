import { Link } from 'react-router-dom'
import Input from '../../Components/Ux/Input/Input'
import Logo from '../../Components/Ux/Logo/Vector.png'
import { useContext } from 'react'
import { AuthContext } from '../Context/Auth'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const schemaLogin = z.object({
  email: z.string().email('Digite um e-mail válido'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
})

type LoginFormData = z.infer<typeof schemaLogin>
export default function CompoLogin() {
  const { login } = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schemaLogin),
  })

  async function handleSubmitLogin({ email, password }: LoginFormData) {
    await login(email, password)
  }

  return (
    <div className="w-screen relative min-h-screen bg-gray-100">
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
            <h2 className="mb-6 text-2xl font-bold">Login</h2>
            <form className="w-full" onSubmit={handleSubmit(handleSubmitLogin)}>
              <div className="space-y-2">
                <label className="block text-sm font-medium my-2">Email</label>
                <Input
                  type="email"
                  {...register('email')}
                  placeholder="Digite seu email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium  my-2">Senha</label>
                <Input
                  type="password"
                  {...register('password')}
                  placeholder="Digite sua senha"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="w-full py-2">
                <button
                  type="submit"
                  className="bg-blue-500 py-2 my-2 px-8 rounded-md text-white hover:bg-blue-700 duration-300 w-full sm:w-auto"
                >
                  Entrar
                </button>
              </div>
            </form>
            <Link
              to="/auth/forget-password"
              className="my-2 text-sm text-gray-500"
            >
              Esqueceu sua senha?
            </Link>
            <Link
              to="/auth/create-account"
              className="my-2 text-sm text-gray-500"
            >
              Não tem cadastro? Crie uma conta
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
