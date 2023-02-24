import { faker } from '@faker-js/faker'
import { Routes } from '../../../../src/lib/routes'
import { fillClientFormCommonFields } from './functions'

describe('Client Domain - Create View', () => {
  beforeEach(() => {
    cy.login()
  })
  it('should render page', () => {
    cy.visit(Routes.createClient)
    cy.dataCy('create-client-page').should('exist')
  })
  it('should not allow to submit empty form', () => {
    cy.visit(Routes.createClient)
    cy.dataCy('submit-button').click()
    cy.dataCy('validation-message').should('exist')
    cy.expectPathname(Routes.createClient)
  })
  it('should allow to submit with only required fields', () => {
    cy.visit(Routes.createClient)
    cy.dataCy('client-name-input').type(faker.name.fullName())
    cy.dataCy('submit-button').click()
    cy.expectPathnameNot(Routes.createClient)
  })
  it('should allow to submit with all fields natural person', () => {
    cy.visit(Routes.createClient)
    fillClientFormCommonFields()
    cy.dataCy('client-person-type-input').select('fisica')
    cy.dataCy('client-personType-accordion').click()
    cy.dataCy('client-father-name-input').type(faker.name.firstName())
    cy.dataCy('client-mother-name-input').type(faker.name.firstName())
    cy.dataCy('client-birth-date-input').type(faker.date.past().toISOString().split('T')[0])
    cy.dataCy('client-cpf-input').type('12345678901')
    cy.dataCy('client-rg-input').type('12345678901')
    cy.dataCy('client-rg-emission-date-input').type(faker.date.past().toISOString().split('T')[0])
    cy.dataCy('client-producer-registration-input').type('12345678901')
    cy.dataCy('submit-button').click()
    cy.expectPathnameNot(Routes.createClient)
  })
  it('should allow to submit with all fields legal person', () => {
    cy.visit(Routes.createClient)
    fillClientFormCommonFields()
    cy.dataCy('client-person-type-input').select('juridica')
    cy.dataCy('client-personType-accordion').click()
    cy.dataCy('client-cnpj-input').type('12345678901234')
    cy.dataCy('client-state-registration-input').type('12345678901234')
    cy.dataCy('submit-button').click()
    cy.expectPathnameNot(Routes.createClient)
  })
})
