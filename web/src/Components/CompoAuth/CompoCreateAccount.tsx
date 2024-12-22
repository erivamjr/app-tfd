import { Link } from 'react-router-dom'
import Input from '../../Components/Ux/Input/Input'
import Logo from '../../Components/Ux/Logo/Vector.png'

export default function CompoCreateAccount() {
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
            <form className="w-full">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Nome</label>
                <Input
                  type="text"
                  name="name"
                  value=""
                  onChange={() => {}}
                  placeholder="Digite seu nome"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium my-2">Email</label>
                <Input
                  type="email"
                  name="email"
                  value=""
                  onChange={() => {}}
                  placeholder="Digite seu email"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium my-2">Senha</label>
                <Input
                  type="password"
                  name="password"
                  value=""
                  onChange={() => {}}
                  placeholder="Digite sua senha"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium my-2">
                  Confirme a Senha
                </label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value=""
                  onChange={() => {}}
                  placeholder="Confirme sua senha"
                />
              </div>
              <div className="w-full py-2">
                <button
                  type="submit"
                  className="bg-blue-500 py-2 my-2 px-8 rounded-md text-white hover:bg-blue-700 duration-300 w-full sm:w-auto"
                >
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
