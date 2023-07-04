import { type Timestamp, type WithId } from '../../../../shared/types/utils/model'

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
  secondaryPhone?: string
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
  rgEmissionDate?: number
  producerRegistration?: string
  birthDate?: number
  fatherName?: string
  motherName?: string
}

export type ClientModel = {
  id: string
  code: number
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
  bags?: number
  coffee?: number
  currency?: number
  escolha?: number
  details: Record<string, number>
}

export type ClientBalancesModel = WithId<{
  balances: ClientBalance
}>
