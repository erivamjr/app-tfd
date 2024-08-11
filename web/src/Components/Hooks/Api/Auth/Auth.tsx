import api from '../../../../Api'

export const createSession = async (email: string, password: any) => {
  return api.post('auth/login', { email, password })
}
