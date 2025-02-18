import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import api from '../../Api'
import Input from '../../Components/Ux/Input/Input'
import Logo from '../../Components/Ux/Logo/Vector.png'

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') // Pega o token da URL
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }

    setLoading(true)
    setError('')
    setMessage('')

    try {
      await api.post('/auth/reset', { password, token })
      setMessage('Senha redefinida com sucesso!')
      setTimeout(() => navigate('/auth/login'), 3000)
    } catch (err) {
      setError('Erro ao redefinir senha. O link pode ter expirado.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 sm:p-10 rounded-lg shadow-lg w-full sm:w-[400px]">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center rounded-tr-3xl bg-blue-600 w-24 h-24">
            <img
              src={Logo}
              alt="Logo"
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold text-center">Redefinir Senha</h2>
          <p className="text-gray-600 text-center text-sm">
            Digite uma nova senha para sua conta.
          </p>
        </div>

        {message && (
          <p className="text-green-600 bg-green-100 p-2 rounded w-full text-center mt-4">
            {message}
          </p>
        )}
        {error && (
          <p className="text-red-600 bg-red-100 p-2 rounded w-full text-center mt-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-4">
          <label className="block text-sm font-medium my-2">Nova Senha</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua nova senha"
            required
            name={'password'}
          />

          <label className="block text-sm font-medium my-2">
            Confirmar Nova Senha
          </label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme sua nova senha"
            required
            name={'password'}
          />

          <button
            type="submit"
            className="w-full bg-green-600 py-2 my-4 px-8 rounded-md text-white hover:bg-green-700 transition-all duration-300"
            disabled={loading}
          >
            {loading ? 'Alterando...' : 'Alterar Senha'}
          </button>
        </form>

        <button
          onClick={() => navigate('/auth/login')}
          className="text-blue-600 hover:underline text-sm text-center w-full block mt-2"
        >
          Voltar para Login
        </button>
      </div>
    </div>
  )
}
