import {
  type CoffeeDetails,
  type DespolpadoDetails,
} from '../../../../../../coffee/types/model/coffee'

export type CoffeeFormValues = {
  date: string
  bags: number
  weight: number
  description: string
  details: Partial<CoffeeDetails | DespolpadoDetails>
}

export type CreateCoffeeValues = Omit<CoffeeFormValues, 'bags' | 'weight'> & {
  clientId: string
  value: number
}
