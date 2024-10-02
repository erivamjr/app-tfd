import api from '../../../../Api'

export const createSession = async (email: string, password: string) => {
  return api.post('auth/login', { email, password })
}
