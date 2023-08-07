import { getBuyCoffeeMetrics } from '../../services/get'

export default function useBuyCoffeeMetricsView(): UseBuyCoffeeMetricsView {
  const { data, isLoading } = getBuyCoffeeMetrics()

  return {
    data,
    isLoading,
  }
}

export type UseBuyCoffeeMetricsView = {
  data: unknown
  isLoading: boolean
}
