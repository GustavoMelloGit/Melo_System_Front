import useFetch from '../../../shared/hooks/useFetch'
import { type SWRServiceResponse } from '../../../shared/types/service/SWRServiceResponse'
import { type PermissionModel } from '../../auth/types/permission'
import { type UserModel } from '../../auth/types/user'

export function useGetAllPermissionsService(): SWRServiceResponse<PermissionModel[]> {
  const response = useFetch('/permissions')
  return response
}

export function useGetAllUsersService(): SWRServiceResponse<UserModel[]> {
  const response = useFetch('/users')
  return response
}
