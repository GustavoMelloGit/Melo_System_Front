import { type CoffeeBebidas, type CoffeeTypes } from '../../../../../coffee/types/model/coffee'

export type TransferType = 'currency' | 'coffee' | 'escolha' | 'bags'
export type BaseReferral<T extends TransferType> = {
  clientId: string
  clientName: string
  transferType: T
}
export type CurrencyReferralTransfer = BaseReferral<'currency'> & {
  value: number
}
export type CoffeeReferralTransfer = BaseReferral<'coffee'> & {
  bebida: CoffeeBebidas
  coffeeType: CoffeeTypes
  bags: number
  weight: number
}
export type EscolhaReferralTransfer = BaseReferral<'escolha'> & {
  bags: number
  weight: number
}
export type BagsReferralTransfer = BaseReferral<'bags'> & {
  value: number
}
export type ReferralTransfer =
  | CurrencyReferralTransfer
  | CoffeeReferralTransfer
  | EscolhaReferralTransfer
  | BagsReferralTransfer

export type Referral = 'from' | 'to'

export type ClientTransferFormValues = {
  from: ReferralTransfer
  to: ReferralTransfer
  description: string
}
