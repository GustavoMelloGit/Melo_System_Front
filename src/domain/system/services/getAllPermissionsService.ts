import useFetch from '../../../shared/hooks/useFetch'
import { type SWRServiceResponse } from '../../../shared/types/service/SWRServiceResponse'
import { type PermissionModel } from '../../auth/types/permission'

export default function useGetAllPermissionsService(): SWRServiceResponse<PermissionModel[]> {
  const response = useFetch('/permissions')
  return response
}
