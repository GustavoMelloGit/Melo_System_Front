import useFetch from '../../../shared/hooks/useFetch'
import { type SWRServiceResponse } from '../../../shared/types/utils/service'
import { type GetTransactionMetricsResponse } from '../types/transaction-metrics'

export function getTransactionMetrics(
  params?: string,
): SWRServiceResponse<GetTransactionMetricsResponse> {
  const response = useFetch<GetTransactionMetricsResponse>(`/metrics/transactions?${params ?? ''}`)

  return response
}
