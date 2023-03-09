import { ClientModel } from '../../../../../src/domain/client/types/model/Client'
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
  it.only('should be able to sort by name', () => {
    cy.wait('@getClients')
    cy.dataCy('table-header-name').within(() => {
      cy.dataCy('table-sort-button').click()
    })
    cy.intercept({
      method: 'GET',
      url: '/clients?*',
    }).as('sortedGetClients')
    cy.wait('@sortedGetClients').then((interception) => {
      const clients = interception.response.body.data as ClientModel[]
      const clientsName = clients.map((client) => client.name).filter(Boolean) as string[]
      const sortedClientsName = [...clientsName].sort().reverse()
      expect(clientsName).to.deep.equal(sortedClientsName)
    })
  })
  it('should be able to sort by nickname', () => {
    cy.dataCy('table-header-nickname').within(() => {
      cy.dataCy('table-sort-button').click()
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
    cy.intercept({
      method: 'GET',
      url: '/clients?*',
    }).as('getClients')
    cy.wait('@getClients').then((interception) => {
      const clients = interception.response.body.data as ClientModel[]
      const clientsBalance = clients.map((client) => client.balance).filter(Boolean) as number[]
      const sortedClientsBalance = [...clientsBalance].sort().reverse()
      expect(clientsBalance).to.deep.equal(sortedClientsBalance)
    })
  })
  it('should be able to search by name', () => {
    cy.dataCy('table-cell-client-name')
      .first()
      .invoke('text')
      .then((clientName) => {
        cy.dataCy('table-searchFor-select').select('name')
        cy.dataCy('table-search-input').type(clientName)
        cy.dataCy('table-submit-search-button').click()
        cy.intercept({
          method: 'GET',
          url: '/clients?*',
        }).as('getClients')
        cy.wait('@getClients').then((interception) => {
          const clients = interception.response.body.data as ClientModel[]
          const clientsName = clients.map((client) => client.name).filter(Boolean) as string[]
          expect(clientsName).to.include(clientName)
        })
      })
  })
  it('should be able to search by nickname', () => {
    cy.dataCy('table-cell-client-nickname')
      .first()
      .invoke('text')
      .then((clientNickname) => {
        cy.dataCy('table-searchFor-select').select('nickname')
        cy.dataCy('table-search-input').type(clientNickname)
        cy.dataCy('table-submit-search-button').click()
        cy.intercept({
          method: 'GET',
          url: '/clients?*',
        }).as('getClients')
        cy.wait('@getClients').then((interception) => {
          const clients = interception.response.body.data as ClientModel[]
          const clientsNickname = clients
            .map((client) => client.nickname)
            .filter(Boolean) as string[]
          expect(clientsNickname).to.include(clientNickname)
        })
      })
  })
  it('should be able to search by brook', () => {
    const brookSearchFor = 'address.brook'
    cy.wait('@getClients').then((interception) => {
      const clients = interception.response.body.data as ClientModel[]
      const clientBrook = clients[0].address.brook ?? ''
      cy.dataCy('table-searchFor-select').select(brookSearchFor)
      cy.dataCy('table-search-input').type(clientBrook)
      cy.dataCy('table-submit-search-button').click()
      cy.intercept({
        method: 'GET',
        url: '/clients?*',
      }).as('getClients')
      cy.wait('@getClients').then((interception) => {
        const clients = interception.response.body.data as ClientModel[]
        const clientsBrook = clients
          .map((client) => client.address.brook)
          .filter(Boolean) as string[]
        expect(clientsBrook).to.include(clientBrook)
      })
    })
  })
})
