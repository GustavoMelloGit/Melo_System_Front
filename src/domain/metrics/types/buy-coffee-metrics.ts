import { type ClientModel } from '../../client/types/model/Client'

export type GetBuyCoffeeMetricsResponse = {
  meta: {
    totalValue: number
    totalWeight: number
    totalBags: number
  }
  data: BuyCoffeeMetrics[]
}

export type BuyCoffeeMetrics = {
  bags: number
  client: ClientModel
  date: number
  value: number
  valuePerBag: number
  weight: number
  _id: string
}

export type BuyCoffeeMetricsFilterOptions = {
  startDate: string
  endDate: string
}
