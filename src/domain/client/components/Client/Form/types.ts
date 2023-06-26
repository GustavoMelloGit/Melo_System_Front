import { type Address, type ClientContact } from '../../../types/model/Client'

export type ClientFormValuesLegalPerson = {
  type?: 'juridica'
  cnpj?: string
  stateRegistration?: string
}

export type ClientFormValuesNaturalPerson = {
  type?: 'fisica'
  cpf?: string
  rg?: string
  rgEmissionDate?: string
  producerRegistration?: string
  birthDate?: string
  fatherName?: string
  motherName?: string
}

export type ClientFormValues = {
  profileImage?: string
  name: string
  nickname?: string
  balance: number
  personType?: ClientFormValuesLegalPerson | ClientFormValuesNaturalPerson
  address: Address
  contact: ClientContact
  description?: string
}
