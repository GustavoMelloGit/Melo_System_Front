import { type Responsible } from '../../../../shared/types/Responsible'
import { type Timestamp } from '../../../../shared/types/Timestamp'
import { type WithId } from '../../../../shared/types/WithId'
import { type SheetModel } from './sheet'

export type BookModel = WithId<
  {
    number: number
    sheets: Array<WithId<SheetModel>>
  } & Timestamp &
    Responsible
>

export type BookFormValues = {
  number: number
}
