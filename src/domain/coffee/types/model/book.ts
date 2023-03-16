import { type Responsible, type Timestamp, type WithId } from '../../../../shared/types/utils/model'
import { type CoffeeDetails } from './coffee'

export type LineDomain = {
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
  lines: Array<WithId<LineDomain>>
} & Timestamp &
  Responsible

export type BookModel = {
  number: number
  sheets: Array<WithId<SheetModel>>
} & Timestamp &
  Responsible

export type BookFormValues = {
  number: string
}
