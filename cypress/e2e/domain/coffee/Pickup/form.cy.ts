import { Routes } from '../../../../../src/lib/routes'
import { pickupFormRequiredFields } from '../../../../support/constants/Coffee/pickup'

describe('Pickup Coffee - Form', () => {
  beforeEach(() => {
    cy.login()
    cy.visit(Routes.coffeePickups)
    cy.dataCy('add-pickupCoffee-button').click()
    cy.dataCy('pickupCoffee-form').should('exist')
  })

  it('should have all required fields', () => {
    pickupFormRequiredFields.forEach((field) => {
      cy.dataCy(field).should('exist')
    })
  })

  it('should not be able to submit without filling required fields', () => {
    cy.dataCy('submit-pickupCoffee-button').click()
    cy.get('.toaster-success').should('not.exist')
  })

  it('should show validation errors when required fields are empty', () => {
    cy.dataCy('submit-pickupCoffee-button').click()
    pickupFormRequiredFields.forEach((field) => {
      cy.dataCy(field).should('have.attr', 'aria-invalid', 'true')
    })
  })
  it('should be able to cancel form', () => {
    cy.dataCy('close-modal-button').click()
    cy.dataCy('pickupCoffee-form').should('not.exist')
  })
})
