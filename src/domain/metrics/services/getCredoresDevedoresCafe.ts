import { formatRequestParams } from '../../../lib/utils/formatters'
import useFetch from '../../../shared/hooks/useFetch'
import { type SWRServiceResponse } from '../../../shared/types/service/SWRServiceResponse'
import { type ClientCoffeeMetric } from '../types/credoresDevedoresCafeMetrics'

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
export function useGetCredoresDevedoresCafeMetrics(
  possibleParams?: Partial<Params>,
): SWRServiceResponse<ClientCoffeeMetric[]> {
  const params = formatRequestParams(possibleParams ?? {})
  const response = useFetch(`/metrics/coffees?${params ?? ''}`)

  return response
}
