import api from '../../../lib/config/api'
import { errorHandler } from '../../../lib/utils/error'
import { type PostServiceResponse } from '../../../shared/types/utils/service'
import { type UserModel } from '../../auth/types/model/user'

type CreateUserData = {
  name: string
  nickname: string
  password: string
  role: 'admin' | 'user'
}
export async function createUserService(data: CreateUserData): PostServiceResponse<UserModel> {
  try {
    const response = await api.post('/users', data)

    return {
      data: response.data,
      error: null,
    }
  } catch (e) {
    return {
      data: null,
      error: errorHandler(e),
    }
  }
}
