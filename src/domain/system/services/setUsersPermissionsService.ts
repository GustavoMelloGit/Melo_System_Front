import api from '../../../lib/config/api'
import { deepCleanObject } from '../../../lib/utils/deepCleanObject'
import { errorHandler } from '../../../lib/utils/errorHandler'
import objectEntries from '../../../lib/utils/objectEntries'
import { type HttpMethods } from '../../../shared/types/HttpMethods'
import { type PostServiceResponse } from '../../../shared/types/service/PostServiceResponse'
import { type UsersPermissionsFormValues } from '../components/Users/UsersList/types'

export type UserPermissionData = {
  id: string
  permissions: Array<{
    method: HttpMethods
    route: string
  }>
}

export async function setUsersPermissionsService(
  data: UserPermissionData[],
): PostServiceResponse<void> {
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

export function parseFormValues(values: UsersPermissionsFormValues): UserPermissionData[] {
  const userPermissionData: UserPermissionData[] = []
  const cleanValues = deepCleanObject(values)

  objectEntries(cleanValues).forEach(([userId, routes]) => {
    const userData: UserPermissionData = {
      id: userId,
      permissions: routes
        ? Object.keys(routes).map((route) => {
            const [method, routeName] = route.split('%') as [HttpMethods, string]
            return { method, route: routeName }
          })
        : [],
    }
    userPermissionData.push(userData)
  })

  return userPermissionData
}
