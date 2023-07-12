import { formatRequestParams } from '../../../lib/utils/formatters'
import useFetch from '../../../shared/hooks/useFetch'
import { type SWRServiceResponse } from '../../../shared/types/utils/service'
import {
  type GetTransactionMetricsParams,
  type GetTransactionMetricsResponse,
} from '../types/transaction-metrics'

export function getTransactionMetrics(
  params?: Partial<GetTransactionMetricsParams>,
): SWRServiceResponse<GetTransactionMetricsResponse> {
  const response = useFetch<GetTransactionMetricsResponse>(
    `/metrics/transactions?${params ? formatRequestParams(params) : ''}`,
  )

  return response
}
