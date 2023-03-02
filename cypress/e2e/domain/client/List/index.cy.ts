import { PaginationParams } from '../../../../../src/lib/constants/pagination'
import { Routes } from '../../../../../src/lib/routes'

const defaultHiddenBalance = 'R$ ----'

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
  it('client balance should be hidden by default', () => {
    cy.dataCy('table-cell-client-balance').each((cell) => {
      expect(cell.text()).to.equal(defaultHiddenBalance)
    })
  })
  it('should be able to hide and show client balance', () => {
    cy.dataCy('table-cell-client-balance').first().click()
    cy.dataCy('table-cell-client-balance').first().should('not.have.text', defaultHiddenBalance)
    cy.dataCy('table-cell-client-balance').first().click()
    cy.dataCy('table-cell-client-balance').first().should('have.text', defaultHiddenBalance)
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
    cy.intercept({
      method: 'GET',
      url: '/clients?*',
    }).as('getClients')
    cy.wait('@getClients').then((interception) => {
      const clients = interception.response.body.data
      const clientsName = clients.map((client) => client.name).filter(Boolean) as string[]
      const sortedClientsName = [...clientsName].sort().reverse()
      expect(clientsName).to.deep.equal(sortedClientsName)
    })
  })
  it('should be able to sort by nickname', () => {
    cy.dataCy('table-header-nickname').within(() => {
      cy.dataCy('table-sort-button').click()
    })
    cy.location().should((loc) => {
      expect(loc.search).to.include(
        `${PaginationParams.sortBy}=nickname&${PaginationParams.sortOrder}=desc`,
      )
    })
    cy.intercept({
      method: 'GET',
      url: '/clients?*',
    }).as('getClients')
    cy.wait('@getClients').then((interception) => {
      const clients = interception.response.body.data
      const clientsNickname = clients.map((client) => client.nickname).filter(Boolean) as string[]
      const sortedClientsNickname = [...clientsNickname].sort().reverse()
      expect(clientsNickname).to.deep.equal(sortedClientsNickname)
    })
  })
  it('should be able to sort by balance', () => {
    cy.dataCy('table-header-balance').within(() => {
      cy.dataCy('table-sort-button').click()
    })
    cy.location().should((loc) => {
      expect(loc.search).to.include(
        `${PaginationParams.sortBy}=balance&${PaginationParams.sortOrder}=desc`,
      )
    })
    cy.intercept({
      method: 'GET',
      url: '/clients?*',
    }).as('getClients')
    cy.wait('@getClients').then((interception) => {
      const clients = interception.response.body.data
      const clientsBalance = clients.map((client) => client.balance).filter(Boolean) as number[]
      const sortedClientsBalance = [...clientsBalance].sort().reverse()
      expect(clientsBalance).to.deep.equal(sortedClientsBalance)
    })
  })
})
