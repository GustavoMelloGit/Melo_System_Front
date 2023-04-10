import api from '../../../lib/config/api'
import { errorHandler } from '../../../lib/utils/error'
import { type GetResponse, type PostServiceResponse } from '../../../shared/types/utils/service'
import { type SignInValues } from '../types'
import { type AuthContextType } from '../types/context/auth'

export async function signInService(values: SignInValues): PostServiceResponse<{
  token: string
  user: AuthContextType['user']
}> {
  try {
    const { data } = await api.post('/login', values)

    return {
      data,
      error: null,
    }
  } catch (e) {
    return {
      data: null,
      error: errorHandler(e),
    }
  }
}

export async function verifyTokenService(): GetResponse<boolean> {
  try {
    const { data } = await api.get('/verify')

    return {
      data,
      error: undefined,
    }
  } catch (e) {
    return {
      data: undefined,
      error: errorHandler(e),
    }
  }
}
