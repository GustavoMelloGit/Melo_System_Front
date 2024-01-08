import { Routes } from '../../../../../src/lib/routes'
import { formatDate } from '../../../../../src/lib/utils/formatters'
import {
  clientFormRequiredFields,
  clientFormRequiredFieldsErrors,
} from '../../../../support/constants/Client/client'
import {
  clearClientFormRequiredFields,
  fillClientFormLegalPersonAllFields,
  fillClientFormNaturalPersonAllFields,
  fillClientFormRequiredFields,
} from '../../../../support/helpers/Client/client'

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
  it('should allow change all fields - Natural Person', () => {
    fillClientFormNaturalPersonAllFields()
    cy.dataCy('submit-button').click()
    cy.expectPathname(Routes.clients)
  })
  it('should allow change all fields - Legal Person', () => {
    fillClientFormLegalPersonAllFields()
    cy.dataCy('submit-button').click()
    cy.expectPathname(Routes.clients)
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
  it('should show updated values on client page', () => {
    cy.url().then((url) => {
      const id = url.split('/').pop()
      const values = fillClientFormNaturalPersonAllFields()
      cy.dataCy('submit-button').click()
      cy.expectPathname(Routes.clients)
      cy.visit(Routes.clientPage(id))
      cy.dataCy('info-tab').click()
      values.forEach((value) => {
        const isDate = value.split('-').length === 3
        if (isDate) {
          const date = formatDate(value)
          cy.contains(date).should('exist')
        } else {
          cy.contains(value).should('exist')
        }
      })
    })
  })
})
