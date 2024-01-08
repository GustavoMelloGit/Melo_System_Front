import { type CoffeeBebidas, type CoffeeTypes } from '../../coffee/types/model/coffee'

export type GetBuyCoffeeMetricsResponse = {
  data: BuyCoffeeMetric[]
}

export type BuyCoffeeMetric = {
  type: `${CoffeeTypes}.${CoffeeBebidas}`
  value: number
  weight: number
}
