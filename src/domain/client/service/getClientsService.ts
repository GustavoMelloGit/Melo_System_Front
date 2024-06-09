import useFetch, { type FetchConfig } from '../../../shared/hooks/useFetch'
import { type GetListResponse } from '../../../shared/types/service/GetListResponse'
import { type SWRServiceResponse } from '../../../shared/types/service/SWRServiceResponse'
import { type ClientModel } from '../types/model/Client'

export function useGetClientsService(
  params?: string,
  config?: FetchConfig,
): SWRServiceResponse<GetListResponse<ClientModel[]>> {
  const response = useFetch<GetListResponse<ClientModel[]>>(`/clients?${params ?? ''}`, config)

  return response
}
