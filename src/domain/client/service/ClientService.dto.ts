import { type CoffeeBebidas, type CoffeeDetails } from '../../coffee/types/model/coffee'
import {
  type CoffeeTransactionModel,
  type CurrencyTransactionModel,
  type EscolhaTransactionModel,
  type FertilizerTransactionModel,
  type SacariaTransactionModel,
} from '../types/model/Transaction'

export type ClientAccount = 'currency' | 'coffee' | 'escolha' | 'bags' | 'fertilizer'

export type ResponseByClientAccount<T extends ClientAccount> = T extends 'currency'
  ? CurrencyTransactionModel
  : T extends 'coffee'
    ? CoffeeTransactionModel
    : T extends 'escolha'
      ? EscolhaTransactionModel
      : T extends 'bags'
        ? SacariaTransactionModel
        : T extends 'fertilizer'
          ? FertilizerTransactionModel
          : never

export type ServiceTransferType = 'currency' | 'escolha' | 'bags' | CoffeeBebidas
type BaseTransferItem<T extends ServiceTransferType> = {
  value: number
  type: T
}
export type TransferCurrencyItem = BaseTransferItem<'currency'>
export type TransferCoffeeItem = BaseTransferItem<CoffeeBebidas> & {
  details?: Partial<CoffeeDetails>
}
export type TransferEscolhaItem = BaseTransferItem<'escolha'>
export type TransferBagsItem = BaseTransferItem<'bags'>

export type TransferBetweenClientsReferralData = {
  clientId: string
  item: TransferCurrencyItem | TransferEscolhaItem | TransferCoffeeItem | TransferBagsItem
}
export type TransferBetweenClientsServiceData = {
  from: TransferBetweenClientsReferralData
  to: TransferBetweenClientsReferralData
  description: string
}
