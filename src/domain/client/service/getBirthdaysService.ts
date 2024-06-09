import useFetch, { type FetchConfig } from '../../../shared/hooks/useFetch'
import { type SWRServiceResponse } from '../../../shared/types/service/SWRServiceResponse'
import { type ClientModel } from '../types/model/Client'

export function useGetBirthdaysService(
  month: string | number,
  config?: FetchConfig,
): SWRServiceResponse<ClientModel[]> {
  const response = useFetch<ClientModel[]>(`/birthdays?month=${month}`, config)

  return response
}
