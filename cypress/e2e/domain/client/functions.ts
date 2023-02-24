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
