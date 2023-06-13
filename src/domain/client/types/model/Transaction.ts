import { type Timestamp, type WithId } from '../../../../shared/types/utils/model'
import { type UserModel } from '../../../auth/types/model/user'
import { type BookModel } from '../../../coffee/types/model/book'
import { type CoffeeDetails, type EscolhaDetails } from '../../../coffee/types/model/coffee'
import { type SheetModel } from '../../../coffee/types/model/sheet'
import { type FertilizerDetails } from '../../../fertilizer/types/model/Fertilizer'

export type TransactionModel = WithId<{
  clientBalance: number
  userId: string
  clientId: string
  date: number
  description: string
  user: UserModel
  type: TransactionType
}> &
  Timestamp

export type CurrencyTransactionModel = TransactionModel

export type EscolhaTransactionModel = TransactionModel & {
  details: EscolhaDetails
}

export type TransactionType<TName = string> = {
  name: TName
  value: number
}

export type CoffeeTransactionModel = TransactionModel & {
  details: CoffeeDetails
}

export type SacariaTransactionModel = TransactionModel & {
  type: TransactionType<'bags'>
  book: Pick<BookModel, 'number' | 'id'> | null
  sheet: Pick<SheetModel, 'number' | 'id'> | null
}

export type FertilizerTransactionModel = TransactionModel & {
  details: FertilizerDetails
}
