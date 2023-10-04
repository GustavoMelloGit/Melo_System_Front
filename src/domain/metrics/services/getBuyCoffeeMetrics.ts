import useFetch from '../../../shared/hooks/useFetch'
import { type SWRServiceResponse } from '../../../shared/types/service/SWRServiceResponse'
import { type GetBuyCoffeeMetricsResponse } from '../types/coffeePriceMetrics'

export function getBuyCoffeeMetrics(
  params?: string,
): SWRServiceResponse<GetBuyCoffeeMetricsResponse> {
  const response = useFetch<GetBuyCoffeeMetricsResponse>(`/metrics/buyCoffee?${params ?? ''}`)

  return response
}
