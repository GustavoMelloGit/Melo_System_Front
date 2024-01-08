import { formatRequestParams } from '../../../lib/utils/formatters'
import useFetch from '../../../shared/hooks/useFetch'
import { type SWRServiceResponse } from '../../../shared/types/service/SWRServiceResponse'
import { type ClientModel } from '../../client/types/model/Client'

type NumberString = number | string
type Params = {
  limit: NumberString
  page: NumberString
  orderDirection: 'asc' | 'desc'
  orderBy: string
  searchableNickname: string
  searchableName: string
  code: NumberString
  greaterThan: NumberString
  showOnly: 'debit' | 'credit'
}
export function getCredoresDevedoresMetrics(
  possibleParams?: Partial<Params>,
): SWRServiceResponse<ClientModel[]> {
  const params = formatRequestParams(possibleParams ?? {})
  const response = useFetch(`/metrics/balances?${params ?? ''}`)

  return response
}
