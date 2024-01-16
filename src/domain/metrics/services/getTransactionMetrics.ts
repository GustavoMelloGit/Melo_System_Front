import useFetch from '../../../shared/hooks/useFetch'
import { type SWRServiceResponse } from '../../../shared/types/service/SWRServiceResponse'
import { type GetTransactionMetricsResponse } from '../types/transactionMetrics'

export function useGetTransactionMetrics(
  params?: string,
): SWRServiceResponse<GetTransactionMetricsResponse> {
  const response = useFetch<GetTransactionMetricsResponse>(`/metrics/transactions?${params ?? ''}`)

  return response
}
