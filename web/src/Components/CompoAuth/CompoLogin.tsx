import { Link } from 'react-router-dom'
import Input from '../../Components/Ux/Input/Input'
import Logo from '../../Components/Ux/Logo/Vector.png'
import { useContext, useState } from 'react'
import { AuthContext } from '../Context/Auth'

export default function CompoLogin() {
  const { login } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (email && password) {
      login(email, password)
    }
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
            <form className="w-full">
              <div className="space-y-2">
                <label className="block text-sm font-medium my-2">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  autocomplete="email"
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                  placeholder="Digite seu email"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium  my-2">Senha</label>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  autocomplete="password"
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  placeholder="Digite sua senha"
                />
              </div>
              <div className="w-full py-2">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 py-2 my-2 px-8 rounded-md text-white hover:bg-blue-700 duration-300 w-full sm:w-auto"
                >
                  Entrar
                </button>
              </div>
            </form>
            <a href="#" className="mt-4 text-sm text-gray-500">
              Esqueceu sua senha?
            </a>
            <Link
              to="/auth?mode=create-account"
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
