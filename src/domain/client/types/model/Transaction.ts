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
  user: Pick<UserModel, 'name' | 'updatedAt' | 'id'>
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

export type ProductTransactionSaleModel = Array<{
  deliveryDate: number
  fertilizerId: string
  fertilizerName: string
  fertilizerDescription: string
  bags: number
  pricePerBag: number
  brook: string | null
  complement: string | null
}>

export type ProductTransactionModel = TransactionBaseModel<'fertilizer'> & {
  sale: ProductTransactionSaleModel
}

export type AllTransactions =
  | CurrencyTransactionModel
  | EscolhaTransactionModel
  | CoffeeTransactionModel
  | SacariaTransactionModel
  | ProductTransactionModel
