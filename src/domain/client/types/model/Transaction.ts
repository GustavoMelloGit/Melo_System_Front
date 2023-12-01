import { type Timestamp } from '../../../../shared/types/Timestamp'
import { type WithId } from '../../../../shared/types/WithId'
import { type UserModel } from '../../../auth/types/model/user'
import { type BookModel } from '../../../coffee/types/model/book'
import {
  type CoffeeBebidas,
  type CoffeeDetails,
  type EscolhaDetails,
} from '../../../coffee/types/model/coffee'
import { type SheetModel } from '../../../coffee/types/model/sheet'
import { type FertilizerDetails } from '../../../product/types/Fertilizer'

export type TransactionTypeName = CoffeeBebidas | 'currency' | 'bags' | 'fertilizer' | 'escolha'
export type TransactionType<TName extends TransactionTypeName> = {
  name: TName
  value: number
}
export type TransactionBaseModel<T extends TransactionTypeName> = WithId<{
  clientBalance: number
  userId: string
  clientId: string
  date: number
  description: string
  user: UserModel
  type: TransactionType<T>
}> &
  Timestamp

export type CurrencyTransactionModel = TransactionBaseModel<'currency'>

export type EscolhaTransactionModel = TransactionBaseModel<'escolha'> & {
  details: EscolhaDetails
}

export type CoffeeTransactionModel = TransactionBaseModel<CoffeeBebidas> & {
  details?: CoffeeDetails
}

export type SacariaTransactionModel = TransactionBaseModel<'bags'> & {
  book: Pick<BookModel, 'number' | 'id'> | null
  sheet: Pick<SheetModel, 'number' | 'id'> | null
}

export type FertilizerTransactionModel = TransactionBaseModel<'fertilizer'> & {
  details: FertilizerDetails
}

export type AllTransactions =
  | CurrencyTransactionModel
  | EscolhaTransactionModel
  | CoffeeTransactionModel
  | SacariaTransactionModel
  | FertilizerTransactionModel
