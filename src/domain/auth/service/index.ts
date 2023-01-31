import api from '../../../lib/service/api'
import { errorHandler } from '../../../lib/utils/error'
import { type SignInValues } from '../types'
import { type SignInResponse } from '../types/service'

export async function signInService(values: SignInValues): Promise<SignInResponse> {
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
