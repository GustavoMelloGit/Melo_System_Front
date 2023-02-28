import { PaginationParams } from '../../../../../src/lib/constants/pagination'
import { Routes } from '../../../../../src/lib/routes'

describe('Client Domain - List View', () => {
  beforeEach(() => {
    cy.login()
    cy.visit(Routes.clients)
    cy.intercept({
      method: 'GET',
      url: '/clients?*',
    }).as('getClients')
    cy.wait('@getClients')
  })

  it('should render page', () => {
    cy.dataCy('list-clients-page').should('exist')
  })
  it('should be able to go to create client', () => {
    cy.dataCy('create-client-button').click()
    cy.expectPathname(Routes.createClient)
  })
  it('should be able to go to edit client', () => {
    cy.dataCy('table-edit-button').first().click()
    cy.location('pathname').should('include', Routes.updateClient(''))
  })
  it('should be able to sort by name', () => {
    cy.dataCy('table-header-name').within(() => {
      cy.dataCy('table-sort-button').click()
    })
    cy.location().should((loc) => {
      expect(loc.search).to.include(
        `${PaginationParams.sortBy}=name&${PaginationParams.sortOrder}=`,
      )
    })
    const clientNames = cy.dataCy('table-row-client-name')

    clientNames.then((names) => {
      const namesJqArray = names.map((_, name) => name.textContent)
      const namesArray = Array.from(namesJqArray).sort()
      const sortedNames = namesArray.sort()

      expect(namesArray).to.deep.equal(sortedNames)
    })
  })
})
