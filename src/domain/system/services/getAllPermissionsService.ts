import useFetch from '../../../shared/hooks/useFetch'
import { type SWRServiceResponse } from '../../../shared/types/service/SWRServiceResponse'
import { type PermissionModel } from '../../auth/types/model/permission'

export default function getAllPermissionsService(): SWRServiceResponse<PermissionModel[]> {
  const response = useFetch('/permissions')
  return response
}
