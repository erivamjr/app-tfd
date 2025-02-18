import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../Components/Ux/Input/Input'
import Logo from '../../Components/Ux/Logo/Vector.png'
import api from '../../Api'

export default function ForgetPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      await api.post('/auth/forget', { email })
      setMessage(
        'Um e-mail foi enviado com as instruções para redefinir sua senha.',
      )
    } catch (err) {
      setError('Erro ao enviar e-mail. Verifique se o e-mail está correto.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-screen relative min-h-screen bg-gray-100">
      {/* Fundo Azul */}
      <div className="absolute z-10 h-screen w-full sm:w-1/2 bg-blue-500 flex items-center justify-center"></div>

      <div className="relative z-20 flex items-center justify-center min-h-screen">
        <div className="flex w-full sm:w-[800px] shadow-lg flex-col sm:flex-row">
          {/* Lado Esquerdo com Logo */}
          <div className="flex items-center justify-center w-full sm:w-1/2 bg-blue-500">
            <img
              src={Logo}
              alt="Logo"
              className="w-48 h-48 rounded-md"
              width="200"
              height="200"
            />
          </div>

          {/* Formulário de Recuperação */}
          <div className="flex flex-col z-30 items-center justify-center w-full sm:w-1/2 px-10 py-10 bg-white">
            <h2 className="mb-6 text-2xl font-bold text-center">
              Recuperação de Senha
            </h2>
            <p className="text-gray-600 text-center">
              Digite seu e-mail para receber um link de recuperação.
            </p>

            {message && (
              <p className="text-green-600 bg-green-100 p-2 rounded w-full text-center">
                {message}
              </p>
            )}
            {error && (
              <p className="text-red-600 bg-red-100 p-2 rounded w-full text-center">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="w-full mt-4">
              <label className="block text-sm font-medium my-2">E-mail</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
                required
                name={'email'}
              />

              <button
                type="submit"
                className="w-full bg-blue-500 py-2 my-4 px-8 rounded-md text-white hover:bg-blue-700 duration-300"
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
              </button>
            </form>

            <button
              onClick={() => navigate('/auth/login')}
              className="text-blue-500 hover:underline text-sm"
            >
              Voltar para Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
