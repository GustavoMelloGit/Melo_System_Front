import { type Responsible, type Timestamp, type WithId } from '../../../../shared/types/utils/model'
import { type SheetModel } from './sheet'

export type BookModel = {
  number: number
  sheets: Array<WithId<SheetModel>>
} & Timestamp &
  Responsible

export type BookFormValues = {
  number: number
}
