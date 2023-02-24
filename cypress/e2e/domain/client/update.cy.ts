import { Routes } from '../../../../src/lib/routes'
import { clientFormRequiredFields, fillClientFormRequiredFields } from './functions'

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
  })
  it('should render page', () => {
    cy.dataCy('update-client-page').should('exist')
  })
  it('should allow save without changing', () => {
    cy.dataCy('submit-button').click()
    cy.expectPathname(Routes.clients)
  })
  it('should allow save only changing required fields', () => {
    fillClientFormRequiredFields()
    cy.dataCy('submit-button').click()
    cy.expectPathname(Routes.clients)
  })
  it('should not allow save without required fields', () => {
    clientFormRequiredFields.forEach((field) => {
      cy.dataCy(field.name).clear()
    })
    cy.dataCy('submit-button').click()
    clientFormRequiredFields.forEach((field) => {
      cy.contains(field.validationMessage).should('exist')
    })
  })
})
