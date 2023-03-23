import { type Responsible, type Timestamp, type WithId } from '../../../../shared/types/utils/model'
import { type CoffeeDetails } from './coffee'

export type LineModel = {
  weight: number
  bags: number
} & Timestamp &
  Responsible

export type SheetModel = {
  number: number
  weighingDate: string
  clientId: string
  coffeeDetails: CoffeeDetails
  courier: string
  lines: Array<WithId<LineModel>>
} & Timestamp &
  Responsible

export type SheetFormValues = {
  isDraft: boolean
  weighingDate: string
  number: number
  courier: string
  coffeeDetails: CoffeeDetails
  coffeeType: string
  clientId: string
  lines: Array<{
    weight: number
    bags: number
  }>
}
