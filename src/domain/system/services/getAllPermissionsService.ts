import useFetch from '../../../shared/hooks/useFetch'
import { type HttpMethods } from '../../../shared/types/HttpMethods'
import { type SWRServiceResponse } from '../../../shared/types/service/SWRServiceResponse'

type GetAllPermissionsResponse = [Lowercase<HttpMethods>, string]

export default function getAllPermissionsService(): SWRServiceResponse<
  GetAllPermissionsResponse[]
> {
  const response = useFetch('/permissions')
  return response
}
