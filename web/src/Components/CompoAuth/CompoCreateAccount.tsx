import { Link } from 'react-router-dom'
import Input from '../../Components/Ux/Input/Input'
import Logo from '../../Components/Ux/Logo/Vector.png'
import Button from '../Ux/Button/Button'

export default function CompoCreateAccount() {
  return (
    <div className="relative min-h-screen bg-gray-100">
      <div className="absolute z-10 h-screen w-1/2 bg-[#008BAD] flex items-center justify-center"></div>
      <div className="relative z-20 flex items-center justify-center min-h-screen">
        <div className="flex w-[800px] shadow-lg">
          <div className="flex items-center justify-center w-1/2 bg-[#008BAD]">
            <img
              src={Logo}
              alt="Logo"
              className="w-48 h-48"
              width="200"
              height="200"
            />
          </div>
          <div className="flex flex-col z-30 items-center justify-center w-1/2 pl-10 pr-10 pt-10 bg-white">
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
                <label className="block text-sm font-medium">Email</label>
                <Input
                  type="email"
                  name="email"
                  value=""
                  onChange={() => {}}
                  placeholder="Digite seu email"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Senha</label>
                <Input
                  type="password"
                  name="password"
                  value=""
                  onChange={() => {}}
                  placeholder="Digite sua senha"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">
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
              <div className="w-full">
                <Button type="submit" title="Cadastrar" />
              </div>
            </form>
            <Link to="/auth?mode=login" className="mt-4 text-sm text-gray-500">
              Já tem uma conta? Entrar
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
