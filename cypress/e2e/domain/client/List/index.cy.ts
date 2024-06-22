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
    cy.dataCy('table-cell-client-actions')
      .first()
      .within(() => {
        cy.get('a').click()
      })
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
  it('should be able to sort descending by name', () => {
    cy.wait('@getClients')
    cy.dataCy('table-header-name').within(() => {
      cy.dataCy('table-sort-button').click()
    })
    cy.dataCy('table-cell-client-name')
      .then((el) => {
        return Cypress.$.makeArray(el).map((e) => e.innerText)
      })
      .then((clientNames) => {
        const sorted = [...clientNames].sort().reverse()
        expect(clientNames).to.deep.equal(sorted)
      })
  })
  it('should be able to sort ascending by name', () => {
    cy.wait('@getClients')
    cy.dataCy('table-header-name').within(() => {
      cy.dataCy('table-sort-button').click()
      cy.dataCy('table-sort-button').click()
    })
    cy.dataCy('table-cell-client-name')
      .then((el) => {
        return Cypress.$.makeArray(el).map((e) => e.innerText)
      })
      .then((clientNames) => {
        const sorted = [...clientNames].sort()
        expect(clientNames).to.deep.equal(sorted)
      })
  })
  it('should be able to sort descending by nickname', () => {
    cy.dataCy('table-header-nickname').within(() => {
      cy.dataCy('table-sort-button').click()
    })
    cy.dataCy('table-cell-client-nickname')
      .then((el) => {
        return Cypress.$.makeArray(el).map((e) => e.innerText)
      })
      .then((clientNicknames) => {
        const sorted = [...clientNicknames].sort().reverse()
        expect(clientNicknames).to.deep.equal(sorted)
      })
  })
  it('should be able to sort ascending by nickname', () => {
    cy.dataCy('table-header-nickname').within(() => {
      cy.dataCy('table-sort-button').click()
      cy.dataCy('table-sort-button').click()
    })
    cy.dataCy('table-cell-client-nickname')

      .then((el) => {
        return Cypress.$.makeArray(el).map((e) => e.innerText)
      })
      .then((clientNicknames) => {
        const sorted = [...clientNicknames].sort()
        expect(clientNicknames).to.deep.equal(sorted)
      })
  })
  it('should be able to sort descending by balance', () => {
    cy.dataCy('table-header-balance').within(() => {
      cy.dataCy('table-sort-button').click()
    })
    cy.dataCy('table-cell-client-balance')
      .then((el) => {
        return Cypress.$.makeArray(el).map((e) => Number(e.getAttribute('data-balance')))
      })
      .then((clientBalances) => {
        const sorted = [...clientBalances].sort((a, b) => b - a)
        expect(clientBalances).to.deep.equal(sorted)
      })
  })
  it('should be able to sort ascending by balance', () => {
    cy.dataCy('table-header-balance').within(() => {
      cy.dataCy('table-sort-button').click()
      cy.dataCy('table-sort-button').click()
    })
    cy.dataCy('table-cell-client-balance')
      .then((el) => {
        return Cypress.$.makeArray(el).map((e) => Number(e.getAttribute('data-balance')))
      })
      .then((clientBalances) => {
        const sorted = [...clientBalances].sort((a, b) => a - b)
        expect(clientBalances).to.deep.equal(sorted)
      })
  })
  it.only('should be able to search by name', () => {
    cy.dataCy('table-cell-client-name')
      .first()
      .invoke('text')
      .then((clientName) => {
        cy.dataCy('table-searchFor-select').select('searchableName')
        cy.dataCy('table-search-input').type(clientName)
        cy.dataCy('table-submit-search-button').click()
        cy.wait('@getClients')
        expect(cy.dataCy('table-cell-client-name').first()).to.have.text(clientName)
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
