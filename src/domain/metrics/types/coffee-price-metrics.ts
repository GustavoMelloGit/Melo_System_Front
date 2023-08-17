import { type CoffeeBebidas, type CoffeeTypes } from '../../coffee/types/model/coffee'

export type GetBuyCoffeeMetricsResponse = {
  data: CoffeePriceMetrics[]
}

export type CoffeePriceMetrics = {
  type: `${CoffeeTypes}.${CoffeeBebidas}`
  value: number
  weight: number
}
