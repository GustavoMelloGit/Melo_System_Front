import {
  type CoffeeDetails,
  type CoffeeTypes,
  type DespolpadoDetails,
} from '../../../../../../coffee/types/model/coffee'

export type CoffeeFormValues = {
  date: string
  bags: number
  weight: number
  details: Partial<CoffeeDetails | DespolpadoDetails>
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
