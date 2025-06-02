import { formatRequestParams } from '../../../lib/utils/formatters'
import useFetch, { type FetchConfig } from '../../../shared/hooks/useFetch'
import { GetListResponse } from '../../../shared/types/service/GetListResponse'
import { type SWRServiceResponse } from '../../../shared/types/service/SWRServiceResponse'
import { type ClientModel } from '../../client/types/model/Client'

type NumberString = number | string

type Params = {
  limit: NumberString
  page: NumberString
  startDate?: string
}

export function useGetInadimplentesMetrics(
  possibleParams?: Partial<Params>,
  config?: FetchConfig,
): SWRServiceResponse<GetListResponse<ClientModel[]>> {
  const params = formatRequestParams(possibleParams ?? {})
  const response = useFetch(`/metrics/get-inactive-clients?${params ?? ''}`, config)

  return response
}
