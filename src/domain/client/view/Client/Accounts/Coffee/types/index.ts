import { type CoffeeBebidas, type CoffeeTypes } from '../../../../../../coffee/types/model/coffee'

export type BuyCoffeeFormValues = {
  coffeeType: CoffeeTypes
  bebida: CoffeeBebidas
  weight: number
  bags: number
  valuePerBag: number
  address: string
}

export type CoffeeFormValues = {
  date: string
  bags: number
  weight: number
  details: {
    bebida: CoffeeBebidas
    coffeeType: CoffeeTypes
    description: string
  }
}

export const CoffeeTypesForm: {
  [key in CoffeeTypes]?: string
} = {
  bica_corrida: 'Bica Corrida',
  conilon: 'Conilon',
  despolpado: 'Despolpado',
}

export type CreateCoffeeValues = Omit<CoffeeFormValues, 'bags' | 'weight'> & {
  clientId: string
  value: number
}
