import { Routes } from '../../../../../src/lib/routes'

describe('Pickup Coffee - List', () => {
  let formData: { clientName: string; bags: string; address: string }
  beforeEach(() => {
    cy.login()
    cy.visit(Routes.coffeePickups)

    cy.fixture('Pickup/form.json').then((form) => {
      formData = form
    })
  })

  it('should be able to find created pickup in list', () => {
    cy.dataCy('add-pickupCoffee-button').click()
    cy.dataCy('pickupCoffee-form').should('exist')
    cy.dataCy('clientName-input').type(formData.clientName)
    cy.dataCy('bags-input').type(formData.bags)
    cy.dataCy('address-input').type(formData.address)
    cy.dataCy('submit-pickupCoffee-button').click()
    cy.dataCy('pickupCoffee-table').should('exist')
    cy.dataCy('pickupCoffee-table').contains(formData.clientName)
    cy.dataCy('pickupCoffee-table').contains(formData.bags)
    cy.dataCy('pickupCoffee-table').contains(formData.address)
  })

  it('should be able to order descending by client name', () => {
    cy.dataCy('pickupCoffee-table').should('exist')
    cy.dataCy('table-header-clientName').within(() => {
      cy.dataCy('table-sort-button').click()
    })
    cy.dataCy('pickupCoffee-table-clientName')
      .then((el) => {
        return Cypress.$.makeArray(el).map((e) => e.innerText)
      })
      .then((clientNames) => {
        const sorted = [...clientNames].sort().reverse()
        expect(clientNames).to.deep.equal(sorted)
      })
  })

  it('should be able to order descending by bags', () => {
    cy.dataCy('pickupCoffee-table').should('exist')
    cy.dataCy('table-header-bags').within(() => {
      cy.dataCy('table-sort-button').click()
    })
    cy.dataCy('pickupCoffee-table-bags')
      .then((el) => {
        return Cypress.$.makeArray(el).map((e) => Number(e.innerText))
      })
      .then((bags) => {
        const sorted = [...bags].sort((a, b) => b - a)
        expect(bags).to.deep.equal(sorted)
      })
  })

  it('should be able to order ascending by name', () => {
    cy.dataCy('pickupCoffee-table').should('exist')
    cy.dataCy('table-header-clientName').within(() => {
      cy.dataCy('table-sort-button').click()
      cy.dataCy('table-sort-button').click()
    })
    cy.dataCy('pickupCoffee-table-clientName')
      .then((el) => {
        return Cypress.$.makeArray(el).map((e) => e.innerText)
      })
      .then((clientNames) => {
        const sorted = [...clientNames].sort()
        expect(clientNames).to.deep.equal(sorted)
      })
  })

  it('should be able to order ascending by bags', () => {
    cy.dataCy('pickupCoffee-table').should('exist')
    cy.dataCy('table-header-bags').within(() => {
      cy.dataCy('table-sort-button').click()
      cy.dataCy('table-sort-button').click()
    })
    cy.dataCy('pickupCoffee-table-bags')
      .then((el) => {
        return Cypress.$.makeArray(el).map((e) => Number(e.innerText))
      })
      .then((bags) => {
        const sorted = [...bags].sort((a, b) => a - b)
        expect(bags).to.deep.equal(sorted)
      })
  })
})
