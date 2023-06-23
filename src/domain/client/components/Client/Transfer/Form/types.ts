import { type CoffeeBebidas, type CoffeeTypes } from '../../../../../coffee/types/model/coffee'

export type CurrencyClientTransfer = {
  clientId: string
  value: number
  transferType: 'currency'
}
export type CoffeeClientTransfer = {
  clientId: string
  transferType: 'coffee'
  bebida: CoffeeBebidas
  coffeType: CoffeeTypes
  bags: number
  weight: number
}

export type ClientTransfer = CurrencyClientTransfer | CoffeeClientTransfer
export type Referral = 'from' | 'to'

export type ClientTransferFormValues = {
  from: ClientTransfer
  to: ClientTransfer
}
