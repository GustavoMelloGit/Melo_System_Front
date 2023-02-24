import { faker } from '@faker-js/faker'

export function fillClientFormCommonFields() {
  cy.dataCy('client-name-input').type(faker.name.fullName())
  cy.dataCy('client-nickname-input').type(faker.name.firstName())
  cy.dataCy('client-phone-input').type(faker.phone.number())
  cy.dataCy('address-accordion').click()
  cy.dataCy('client-city-input').type(faker.address.city())
  cy.dataCy('client-zipcode-input').type(faker.address.zipCode())
  cy.dataCy('client-street-input').type(faker.address.streetName())
  cy.dataCy('client-address-number-input').type(faker.address.buildingNumber())
  cy.dataCy('client-neighborhood-input').type(faker.address.streetName())
  cy.dataCy('client-brook-input').type(faker.address.streetName())
  cy.dataCy('client-description-input').type(faker.lorem.words())
}

export function fillClientFormNaturalPersonFields() {
  cy.dataCy('client-person-type-input').select('fisica')
  cy.dataCy('client-personType-accordion').click()
  cy.dataCy('client-father-name-input').type(faker.name.firstName())
  cy.dataCy('client-mother-name-input').type(faker.name.firstName())
  cy.dataCy('client-birth-date-input').type(faker.date.past().toISOString().split('T')[0])
  cy.dataCy('client-cpf-input').type('12345678901')
  cy.dataCy('client-rg-input').type('12345678901')
  cy.dataCy('client-rg-emission-date-input').type(faker.date.past().toISOString().split('T')[0])
  cy.dataCy('client-producer-registration-input').type('12345678901')
}

export function fillClientFormLegalPersonFields() {
  cy.dataCy('client-person-type-input').select('juridica')
  cy.dataCy('client-personType-accordion').click()
  cy.dataCy('client-cnpj-input').type('12345678901234')
  cy.dataCy('client-state-registration-input').type('12345678901234')
}
