import { type SignInValues } from '../types'
import { type SignInResponse } from '../types/service'

export async function signInService(values: SignInValues): Promise<SignInResponse> {
  return {
    data: {
      isAuthenticated: true,
    },
    error: null,
  }
}
