import { formatRequestParams } from '../../../lib/utils/formatters'
import useFetch, { type FetchConfig } from '../../../shared/hooks/useFetch'
import { type SWRServiceResponse } from '../../../shared/types/service/SWRServiceResponse'
import { type ClientModel } from '../../client/types/model/Client'

type NumberString = number | string
export type ShowOnly = 'debit' | 'credit'
type Params = {
  limit: NumberString
  page: NumberString
  orderDirection: 'asc' | 'desc'
  orderBy: string
  searchableNickname: string
  searchableName: string
  code: NumberString
  greaterThan: NumberString
  showOnly: ShowOnly
}
export function useGetCredoresDevedoresMetrics(
  possibleParams?: Partial<Params>,
  config?: FetchConfig,
): SWRServiceResponse<ClientModel[]> {
  const params = formatRequestParams(possibleParams ?? {})
  const response = useFetch(`/metrics/balances?${params ?? ''}`, config)

  return response
}
