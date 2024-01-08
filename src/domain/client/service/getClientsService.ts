import { type SWRConfiguration } from 'swr'
import useFetch from '../../../shared/hooks/useFetch'
import { type GetListResponse } from '../../../shared/types/service/GetListResponse'
import { type SWRServiceResponse } from '../../../shared/types/service/SWRServiceResponse'
import { type ClientModel } from '../types/model/Client'

export function getClientsService(
  params?: string,
  config?: SWRConfiguration,
): SWRServiceResponse<GetListResponse<ClientModel[]>> {
  const response = useFetch<GetListResponse<ClientModel[]>>(`/clients?${params ?? ''}`, config)

  return response
}
