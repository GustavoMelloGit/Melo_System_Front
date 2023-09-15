import { type SWRConfiguration } from 'swr'
import useFetch from '../../../shared/hooks/useFetch'
import { type SWRServiceResponse } from '../../../shared/types/service/SWRServiceResponse'
import { type ClientModel } from '../types/model/Client'

export function getBirthdaysService(
  month: string | number,
  config?: SWRConfiguration,
): SWRServiceResponse<ClientModel[]> {
  const response = useFetch<ClientModel[]>(`/birthdays?month=${month}`, config)

  return response
}
