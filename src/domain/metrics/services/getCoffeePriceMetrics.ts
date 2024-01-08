import useFetch from '../../../shared/hooks/useFetch'
import { type SWRServiceResponse } from '../../../shared/types/service/SWRServiceResponse'
import { type GetCoffeePriceMetricsResponse } from '../types/buyCoffeeMetrics'

export function getCoffeePriceMetrics(
  params?: string,
): SWRServiceResponse<GetCoffeePriceMetricsResponse> {
  const response = useFetch<GetCoffeePriceMetricsResponse>(`/metrics/coffeePrice?${params ?? ''}`)

  return response
}
