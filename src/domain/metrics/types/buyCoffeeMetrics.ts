import { type ClientModel } from '../../client/types/model/Client'
import { type CoffeeBebidas, type CoffeeTypes } from '../../coffee/types/model/coffee'

export type GetCoffeePriceMetricsResponse = {
  meta: {
    totalValue: number
    totalWeight: number
    totalBags: number
  }
  data: CoffeePriceMetrics[]
}

export type CoffeePriceMetrics = {
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

export type CoffeePriceMetricsFilterOptions = {
  startDate: string
  endDate: string
  coffeeType: CoffeeTypes
  bebida: CoffeeBebidas
}
