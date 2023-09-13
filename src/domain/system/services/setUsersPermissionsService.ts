import api from '../../../lib/config/api'
import { errorHandler } from '../../../lib/utils/errorHandler'
import { type HttpMethods } from '../../../shared/types/HttpMethods'
import { type PostServiceResponse } from '../../../shared/types/service/PostServiceResponse'
import { type UserModel } from '../../auth/types/model/user'

export type UserPermissionData = {
  userId: string
  permissions: Array<{
    method: HttpMethods
    route: string
  }>
}

export async function setUsersPermissionsService(
  data: UserPermissionData[],
): PostServiceResponse<UserModel[]> {
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
