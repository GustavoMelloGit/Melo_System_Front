import { type Responsible, type Timestamp, type WithId } from '../../../../shared/types/utils/model'
import { type CoffeeDetails } from './coffee'

export type LineModel = {
  weight: number
  bags: number
} & Timestamp &
  Responsible

export type SheetModel = {
  number: number
  weighingDate: Date
  clientId: string
  coffeeDetails: CoffeeDetails
  courier: string
  lines: Array<WithId<LineModel>>
} & Timestamp &
  Responsible

export type SheetFormValues = {
  weighingDate: string
  number: number
  courier: string
  coffeeDetails: {
    type: string
    moisture: number
  }
  lines: [
    {
      weight: number
      bags: number
    },
    {
      weight: number
      bags: number
    },
  ]
}
