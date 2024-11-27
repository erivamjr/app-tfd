import api from '../../../../Api'

export const createSession = async (email: string, password: string) => {
  return api.post('auth/login', { email, password })
}

export const dataUser = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('Token not found')
  }
  api.defaults.headers.Authorization = `Bearer ${token}`
  const response = await api.post('/auth/me')
  return response
}
