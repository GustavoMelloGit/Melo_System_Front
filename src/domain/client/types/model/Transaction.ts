import { type Timestamp, type WithId } from '../../../../shared/types/utils/model'
import { type UserModel } from '../../../auth/types/model/user'
import { type CoffeeDetails, type EscolhaDetails } from '../../../coffee/types/model/coffee'

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
