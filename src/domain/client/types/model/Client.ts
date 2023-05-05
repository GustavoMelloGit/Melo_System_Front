import { type Timestamp } from '../../../../shared/types/utils/model'
import { type CoffeeDetailsTypes } from '../../../coffee/types/model/coffee'

export type Address = {
  city?: string
  zipCode?: string
  street?: string
  number?: string
  state?: string
  neighborhood?: string
  brook?: string
  complement?: string
  location?: {
    lat?: number
    lng?: number
  }
}

export type ClientContact = {
  phone?: string
}

export type LegalPerson = {
  type?: 'juridica'
  cnpj?: string
  stateRegistration?: string
}

export type NaturalPerson = {
  type?: 'fisica'
  cpf?: string
  rg?: string
  rgEmissionDate?: string
  producerRegistration?: string
  birthDate?: string
  fatherName?: string
  motherName?: string
}

export type ClientModel = {
  id: string
  profileImage?: string
  name: string
  nickname?: string
  balance: number
  personType?: LegalPerson | NaturalPerson
  address: Address
  contact: ClientContact
  description?: string
} & Timestamp

export type ClientBalance = {
  type: CoffeeDetailsTypes | 'bags' | 'currency'
  value: number
}

export type ClientBalancesModel = ClientModel & {
  balances: ClientBalance[]
}
