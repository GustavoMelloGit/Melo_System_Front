import { Routes } from '../../../../../src/lib/routes'
import {
  pickupFormRequiredFields,
  pickupFormRequiredFieldsValues,
} from '../../../../support/constants/Coffee/pickup'

describe('Pickup Coffee - Update', () => {
  let formData: { clientName: string; bags: string; address: string }
  beforeEach(() => {
    cy.login()
    cy.visit(Routes.coffeePickups)
    cy.dataCy('pickupCoffee-edit').first().click()
    cy.dataCy('pickupCoffee-form').should('exist')
    cy.fixture('Pickup/form.json').then((form) => {
      formData = form
    })
  })
  it('should allow save without changes', () => {
    cy.dataCy('submit-pickupCoffee-button').click()
    cy.dataCy('pickupCoffee-form').should('not.exist')
    cy.dataCy('pickupCoffee-table').should('exist')
    cy.get('.toaster-success').should('exist')
  })
  it('should show validation errors when required fields are empty', () => {
    pickupFormRequiredFields.forEach((field) => {
      cy.dataCy(field).clear()
    })
    cy.dataCy('submit-pickupCoffee-button').click()
    pickupFormRequiredFields.forEach((field) => {
      cy.dataCy(field).should('have.attr', 'aria-invalid', 'true')
    })
  })
  it('should be able to update a pickup', () => {
    cy.dataCy('pickupCoffee-form').within(() => {
      pickupFormRequiredFields.forEach((field) => {
        cy.dataCy(field).clear().type(pickupFormRequiredFieldsValues.get(field))
      })
      cy.dataCy('submit-pickupCoffee-button').click()
    })
    cy.dataCy('pickupCoffee-form').should('not.exist')
    cy.dataCy('pickupCoffee-table').should('exist')
    cy.get('.toaster-success').should('exist')
  })
  it('should be able to cancel update', () => {
    cy.dataCy('close-modal-button').click()
    cy.dataCy('pickupCoffee-form').should('not.exist')
    cy.dataCy('pickupCoffee-table').should('exist')
    cy.get('.toaster-success').should('not.exist')
  })
  it('should be able to cancel update with esc', () => {
    cy.get('body').type('{esc}')
    cy.dataCy('pickupCoffee-form').should('not.exist')
    cy.dataCy('pickupCoffee-table').should('exist')
    cy.get('.toaster-success').should('not.exist')
  })
  it('should not be able to update a pickup without required fields', () => {
    cy.dataCy('pickupCoffee-form').within(() => {
      pickupFormRequiredFields.forEach((field) => {
        cy.dataCy(field).clear()
      })
      cy.dataCy('submit-pickupCoffee-button').click()
      pickupFormRequiredFields.forEach((field) => {
        cy.dataCy(field).should('have.attr', 'aria-invalid', 'true')
      })
    })
    cy.dataCy('pickupCoffee-form').should('exist')
    cy.get('.toaster-success').should('not.exist')
  })
})
