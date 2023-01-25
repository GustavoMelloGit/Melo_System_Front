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
  fatherName?: string
  motherName?: string
  phone?: string
}

export type ClientDocument = {}

export type LegalPerson = {
  personType?: 'juridica'
  cnpj?: string
  stateRegistration?: string
}

export type NaturalPerson = {
  personType?: 'fisica'
  cpf?: string
  rg?: string
  rgEmissionDate?: string
  producerRegistration?: string
}

export type ClientModel = {
  id: string
  profileImage?: string
  name: string
  nickname?: string
  balance?: number
  personType?: LegalPerson | NaturalPerson
  birthDate?: Date
  address: Address
  contact: ClientContact
  description?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}
