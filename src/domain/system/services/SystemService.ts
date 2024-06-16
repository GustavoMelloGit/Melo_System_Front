import api from '../../../lib/config/api'
import { errorHandler } from '../../../lib/utils/errorHandler'
import { type PostServiceResponse } from '../../../shared/types/service/PostServiceResponse'
import { type UserModel } from '../../auth/types/user'
import { type CreateUserData, type UserPermissionData } from './SystemService.dto'

export class SystemService {
  static async createUser(data: CreateUserData): PostServiceResponse<UserModel> {
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

  static async setUsersPermissions(data: UserPermissionData[]): PostServiceResponse<void> {
    try {
      const response = await api.put('/users/permissions', {
        idsWithPermissions: data,
      })

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
}
