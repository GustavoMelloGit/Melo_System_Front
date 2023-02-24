import { faker } from '@faker-js/faker'
import { Routes } from '../../../../src/lib/routes'
import {
  fillClientFormCommonFields,
  fillClientFormLegalPersonFields,
  fillClientFormNaturalPersonFields,
} from './functions'

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
    fillClientFormNaturalPersonFields()
    cy.dataCy('submit-button').click()
    cy.expectPathnameNot(Routes.createClient)
  })
  it('should allow to submit with all fields legal person', () => {
    cy.visit(Routes.createClient)
    fillClientFormCommonFields()
    fillClientFormLegalPersonFields()
    cy.dataCy('submit-button').click()
    cy.expectPathnameNot(Routes.createClient)
  })
})
