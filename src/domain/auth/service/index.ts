import api from '../../../lib/config/api'
import { errorHandler } from '../../../lib/utils/errorHandler'
import { type GetServiceResponse } from '../../../shared/types/service/GetServiceResponse'
import { type SignInResponse, type SignInValues } from '../types'

export async function signInService(values: SignInValues): SignInResponse {
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

export async function verifyTokenService(): GetServiceResponse<void> {
  try {
    const { data } = await api.get('/verify')

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
