import { Routes } from '../../../../../src/lib/routes'

describe('Pickup Coffee - View', () => {
  beforeEach(() => {
    cy.login()
    cy.visit(Routes.coffeePickups)
    cy.intercept({
      method: 'GET',
      url: '/orders?*',
    }).as('getOrders')
  })
  it('should render page', () => {
    cy.dataCy('coffee-pickup-page').should('exist')
  })
})

describe('Pickup Coffee - Create', () => {
  let formData
  beforeEach(() => {
    cy.login()
    cy.visit(Routes.coffeePickups)
    cy.dataCy('add-pickupCoffee-button').click()
    cy.dataCy('pickupCoffee-form').should('exist')
    cy.fixture('Pickup/form.json').then((form) => {
      formData = form
    })
  })

  it('should be able to add a new pickup', () => {
    cy.dataCy('clientName-input').type(formData.clientName)
    cy.dataCy('bags-input').type(formData.bags)
    cy.dataCy('address-input').type(formData.address)
    cy.dataCy('submit-pickupCoffee-button').click()
    cy.get('.toaster-success').should('be.visible')
  })
})
