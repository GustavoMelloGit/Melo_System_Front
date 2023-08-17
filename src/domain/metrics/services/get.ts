import useFetch from '../../../shared/hooks/useFetch'
import { type SWRServiceResponse } from '../../../shared/types/utils/service'
import { type GetBuyCoffeeMetricsResponse } from '../types/buy-coffee-metrics'
import { type CoffeePriceMetrics } from '../types/coffee-price-metrics'
import { type GetTransactionMetricsResponse } from '../types/transaction-metrics'

export function getTransactionMetrics(
  params?: string,
): SWRServiceResponse<GetTransactionMetricsResponse> {
  const response = useFetch<GetTransactionMetricsResponse>(`/metrics/transactions?${params ?? ''}`)

  return response
}

export function getBuyCoffeeMetrics(
  params?: string,
): SWRServiceResponse<GetBuyCoffeeMetricsResponse> {
  const response = useFetch<GetBuyCoffeeMetricsResponse>(
    `/metrics/transactions/overhaul?${params ?? ''}`,
  )

  return response
}

export function getCoffeePriceMetrics(params?: string): SWRServiceResponse<CoffeePriceMetrics> {
  const response = useFetch<CoffeePriceMetrics>(`/metrics/coffeePrice?${params ?? ''}`)

  return response
}
