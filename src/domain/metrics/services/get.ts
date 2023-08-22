import useFetch from '../../../shared/hooks/useFetch'
import { type SWRServiceResponse } from '../../../shared/types/utils/service'
import { type GetCoffeePriceMetricsResponse } from '../types/buyCoffeeMetrics'
import { type GetBuyCoffeeMetricsResponse } from '../types/coffeePriceMetrics'
import { type GetTransactionMetricsResponse } from '../types/transactionMetrics'

export function getTransactionMetrics(
  params?: string,
): SWRServiceResponse<GetTransactionMetricsResponse> {
  const response = useFetch<GetTransactionMetricsResponse>(`/metrics/transactions?${params ?? ''}`)

  return response
}

export function getBuyCoffeeMetrics(
  params?: string,
): SWRServiceResponse<GetBuyCoffeeMetricsResponse> {
  const response = useFetch<GetBuyCoffeeMetricsResponse>(`/metrics/buyCoffee?${params ?? ''}`)

  return response
}

export function getCoffeePriceMetrics(
  params?: string,
): SWRServiceResponse<GetCoffeePriceMetricsResponse> {
  const response = useFetch<GetCoffeePriceMetricsResponse>(`/metrics/coffeePrice?${params ?? ''}`)

  return response
}
