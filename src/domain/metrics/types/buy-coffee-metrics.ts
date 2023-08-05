export type GetBuyCoffeeMetricsResponse = {
  meta: {
    totalValue: number
    totalWeight: number
    totalBags: number
  }
  data: BuyCoffeeMetrics[]
}

export type BuyCoffeeMetrics = {
  value: number
  weight: number
  bags: number
  valuePerBag: number
}
