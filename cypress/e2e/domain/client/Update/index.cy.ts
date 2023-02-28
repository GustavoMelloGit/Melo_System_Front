import { Routes } from '../../../../../src/lib/routes'
import {
  clearClientFormRequiredFields,
  clientFormRequiredFields,
  clientFormRequiredFieldsErrors,
  fillClientFormLegalPersonAllFields,
  fillClientFormNaturalPersonAllFields,
  fillClientFormRequiredFields,
} from '../../../../support/helpers/client'

describe('Client Domain - Update View', () => {
  beforeEach(() => {
    cy.login()
    cy.visit(Routes.clients)
    cy.intercept({
      method: 'GET',
      url: '/clients?*',
    }).as('getClients')
    cy.wait('@getClients')
    cy.dataCy('table-edit-button').first().click()
    cy.intercept({
      method: 'GET',
      url: '/clients/*',
    }).as('getClient')
    cy.wait('@getClient')
  })
  it('should render page', () => {
    cy.dataCy('update-client-page').should('exist')
  })
  it('should allow save without changing', () => {
    cy.dataCy('submit-button').click()
    cy.expectPathname(Routes.clients)
  })
  it('should allow save only changing required fields', () => {
    clearClientFormRequiredFields()
    const values = fillClientFormRequiredFields()
    cy.dataCy('submit-button').click()
    cy.expectPathname(Routes.clients)
    cy.dataCy('table-linkTo-button').first().click() // Most recent client (for being updated)
    cy.dataCy('info-tab').click()
    values.forEach((value) => {
      cy.contains(value).should('exist')
    })
  })
  it('should allow change all fields - Natural Person', () => {
    const values = fillClientFormNaturalPersonAllFields()
    cy.dataCy('submit-button').click()
    cy.expectPathname(Routes.clients)
    cy.dataCy('table-linkTo-button').first().click() // Most recent client (for being updated)
    cy.dataCy('info-tab').click()
    values.forEach((value) => {
      cy.contains(value).should('exist')
    })
  })
  it('should allow change all fields - Legal Person', () => {
    const values = fillClientFormLegalPersonAllFields()
    cy.dataCy('submit-button').click()
    cy.expectPathname(Routes.clients)
    cy.dataCy('table-linkTo-button').first().click() // Most recent client (for being updated)
    cy.dataCy('info-tab').click()
    values.forEach((value) => {
      cy.contains(value).should('exist')
    })
  })
  it('should not allow save without required fields', () => {
    clearClientFormRequiredFields()
    cy.dataCy('submit-button').click()
    clientFormRequiredFields.forEach((field) => {
      cy.contains(clientFormRequiredFieldsErrors.get(field)).should('exist')
    })
  })
  it('should allow go back without saving', () => {
    cy.dataCy('breadcrumb-/clients').click()
    cy.expectPathname(Routes.clients)
  })
})
