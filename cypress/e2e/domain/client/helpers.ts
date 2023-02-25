import { faker } from '@faker-js/faker'
import { validationErrors } from '../../../../src/lib/errors'

export const clientFormRequiredFields = ['client-name-input'] as const
export const clientFormRequiredFieldsValues = new Map([
  ['client-name-input', faker.name.fullName()],
])
export const clientFormRequiredFieldsErrors = new Map([
  ['client-name-input', validationErrors.nameIsRequired],
])

export function fillClientFormRequiredFields(): string[] {
  return clientFormRequiredFields.map((field) => {
    const value = clientFormRequiredFieldsValues.get(field)
    cy.dataCy(field).type(value)
    return value
  })
}
export function clearClientFormRequiredFields() {
  clientFormRequiredFields.forEach((field) => {
    cy.dataCy(field).clear()
  })
}
export function fillClientFormCommonFields(): string[] {
  const name = faker.name.firstName()
  const nickname = faker.name.firstName()
  const phone = faker.phone.number()
  const city = faker.address.city()
  const zipcode = faker.address.zipCode()
  const street = faker.address.streetName()
  const addressNumber = faker.address.buildingNumber()
  const neighborhood = faker.address.streetName()
  const brook = faker.address.streetName()
  const description = faker.lorem.words()
  cy.dataCy('client-name-input').type(name)
  cy.dataCy('client-nickname-input').type(nickname)
  cy.dataCy('client-phone-input').type(phone)
  cy.dataCy('address-accordion').click()
  cy.dataCy('client-city-input').type(city)
  cy.dataCy('client-zipcode-input').type(zipcode)
  cy.dataCy('client-street-input').type(street)
  cy.dataCy('client-address-number-input').type(addressNumber)
  cy.dataCy('client-neighborhood-input').type(neighborhood)
  cy.dataCy('client-brook-input').type(brook)
  cy.dataCy('client-description-input').type(description)
  return [
    name,
    nickname,
    phone,
    city,
    zipcode,
    street,
    addressNumber,
    neighborhood,
    brook,
    description,
  ]
}

export function fillClientFormNaturalPersonFields(): string[] {
  const fatherName = faker.name.firstName('male')
  const motherName = faker.name.firstName('female')
  const birthDate = faker.date.past().toISOString().split('T')[0]
  const cpf = '12345678901'
  const rg = '12345678901'
  const rgEmissionDate = faker.date.past().toISOString().split('T')[0]
  const producerRegistration = '12345678901'

  cy.dataCy('client-person-type-input').select('fisica')
  cy.dataCy('client-personType-accordion').click()
  cy.dataCy('client-father-name-input').type(fatherName)
  cy.dataCy('client-mother-name-input').type(motherName)
  cy.dataCy('client-birth-date-input').type(birthDate)
  cy.dataCy('client-cpf-input').type(cpf)
  cy.dataCy('client-rg-input').type(rg)
  cy.dataCy('client-rg-emission-date-input').type(rgEmissionDate)
  cy.dataCy('client-producer-registration-input').type(producerRegistration)

  return [fatherName, motherName, birthDate, cpf, rg, rgEmissionDate, producerRegistration]
}

export function fillClientFormLegalPersonFields(): string[] {
  const cnpj = '12345678901234'
  const stateRegistration = '12345678901234'
  cy.dataCy('client-person-type-input').select('juridica')
  cy.dataCy('client-personType-accordion').click()
  cy.dataCy('client-cnpj-input').type('12345678901234')
  cy.dataCy('client-state-registration-input').type('12345678901234')

  return [cnpj, stateRegistration]
}

export function fillClientFormNaturalPersonAllFields(): string[] {
  const commonFields = fillClientFormCommonFields()
  const naturalPersonFields = fillClientFormNaturalPersonFields()

  return [...commonFields, ...naturalPersonFields]
}

export function fillClientFormLegalPersonAllFields(): string[] {
  const commonFields = fillClientFormCommonFields()
  const legalPersonFields = fillClientFormLegalPersonFields()
  return [...commonFields, ...legalPersonFields]
}
