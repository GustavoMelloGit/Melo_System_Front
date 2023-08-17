import { type ClientModel } from '../../client/types/model/Client'
import { type CoffeeBebidas, type CoffeeTypes } from '../../coffee/types/model/coffee'

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
  coffeeType: CoffeeTypes
  bebida: CoffeeBebidas
  weight: number
  _id: string
}

export type BuyCoffeeMetricsFilterOptions = {
  startDate: string
  endDate: string
}
