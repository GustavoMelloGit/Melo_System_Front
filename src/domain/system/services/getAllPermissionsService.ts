import useFetch from '../../../shared/hooks/useFetch'
import { type SWRServiceResponse } from '../../../shared/types/service/SWRServiceResponse'
import { type Permission } from '../types/Permission'

export default function getAllPermissionsService(): SWRServiceResponse<Permission[]> {
  const response = useFetch('/permissions')
  return response
}
