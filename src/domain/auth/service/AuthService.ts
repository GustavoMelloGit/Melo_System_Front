import api from '../../../lib/config/api'
import { errorHandler } from '../../../lib/utils/errorHandler'
import { type GetServiceResponse } from '../../../shared/types/service/GetServiceResponse'
import { type PostServiceResponse } from '../../../shared/types/service/PostServiceResponse'
import { type SignInInputDto, type SignInOutputDto } from './AuthService.dto'

export class AuthService {
  static async signInService(values: SignInInputDto): PostServiceResponse<SignInOutputDto> {
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

  static async verifyTokenService(): GetServiceResponse<void> {
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
}
