import { Routes } from '../../../../../src/lib/routes'

describe('Pickup Coffee - Create', () => {
  let formData: { clientName: string; bags: string; address: string }
  beforeEach(() => {
    cy.login()
    cy.visit(Routes.coffeePickups)
    cy.dataCy('add-pickupCoffee-button').click()
    cy.dataCy('pickupCoffee-form').should('exist')
    cy.fixture('Pickup/form.json').then((form) => {
      formData = form
    })
  })

  it('should be able to create a pickup', () => {
    cy.dataCy('pickupCoffee-form').within(() => {
      cy.dataCy('clientName-input').type(formData.clientName)
      cy.dataCy('bags-input').type(formData.bags)
      cy.dataCy('address-input').type(formData.address)
      cy.dataCy('submit-pickupCoffee-button').click()
    })
    cy.dataCy('pickupCoffee-form').should('not.exist')
    cy.dataCy('pickupCoffee-table').should('exist')
    cy.get('.toaster-success').should('exist')
  })
})
