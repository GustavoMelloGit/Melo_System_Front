import { type CoffeeBebidas, type CoffeeTypes } from '../../../../../coffee/types/model/coffee'

export type BaseReferral = {
  clientId: string
  clientName: string
}
export type CurrencyReferralTransfer = BaseReferral & {
  value: number
  transferType: 'currency'
}
export type CoffeeReferralTransfer = BaseReferral & {
  transferType: 'coffee'
  bebida: CoffeeBebidas
  coffeeType: CoffeeTypes
  bags: number
  weight: number
}

export type ReferralTransfer = CurrencyReferralTransfer | CoffeeReferralTransfer
export type Referral = 'from' | 'to'

export type ClientTransferFormValues = {
  from: ReferralTransfer
  to: ReferralTransfer
  description: string
}
