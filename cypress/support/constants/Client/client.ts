import { faker } from '@faker-js/faker'
import { validationErrors } from '../../../../src/lib/errors'

export const clientFormRequiredFields = ['client-name-input'] as const
export const clientFormRequiredFieldsValues = new Map([
  ['client-name-input', faker.name.fullName()],
])
export const clientFormRequiredFieldsErrors = new Map([
  ['client-name-input', validationErrors.nameIsRequired],
])
export const clientFormNaturalPersonFields = [
  'client-father-name-input',
  'client-mother-name-input',
  'client-birth-date-input',
  'client-cpf-input',
  'client-rg-input',
  'client-rg-emission-date-input',
  'client-producer-registration-input',
] as const
export const clientFormNaturalPersonFieldsValues = new Map([
  ['client-father-name-input', faker.name.firstName('male')],
  ['client-mother-name-input', faker.name.firstName('female')],
  ['client-birth-date-input', faker.date.past().toISOString().split('T')[0]],
  ['client-cpf-input', '12345678901'],
  ['client-rg-input', '12345678901'],
  ['client-rg-emission-date-input', faker.date.past().toISOString().split('T')[0]],
  ['client-producer-registration-input', '12345678901'],
])

export const clientFormLegalPersonFields = [
  'client-cnpj-input',
  'client-state-registration-input',
] as const
export const clientFormLegalPersonFieldsValues = new Map([
  ['client-cnpj-input', '12345678901234'],
  ['client-state-registration-input', '12345678901234'],
])

export const clientFormCommonFields = [
  'client-name-input',
  'client-nickname-input',
  'client-phone-input',
  'client-city-input',
  'client-zipcode-input',
  'client-street-input',
  'client-address-number-input',
  'client-neighborhood-input',
  'client-brook-input',
  'client-description-input',
] as const
export const clientFormCommonFieldsValues = new Map([
  ['client-name-input', faker.name.firstName()],
  ['client-nickname-input', faker.name.firstName()],
  ['client-phone-input', faker.phone.number('#########')],
  ['client-city-input', faker.address.city()],
  ['client-zipcode-input', faker.address.zipCode('########')],
  ['client-street-input', faker.address.streetName()],
  ['client-address-number-input', faker.address.buildingNumber()],
  ['client-neighborhood-input', faker.address.streetName()],
  ['client-brook-input', faker.address.streetName()],
  ['client-description-input', faker.lorem.words()],
])
