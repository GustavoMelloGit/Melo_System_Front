/// <reference types="cypress" />
import StorageManager from '../../src/lib/utils/StorageManager'

Cypress.Commands.add('dataCy', (value) => {
  return cy.get(`[data-cy="${value}"]`)
})

Cypress.Commands.add('expectPathname', (value) => {
  return cy.location('pathname').should('eq', value)
})

Cypress.Commands.add('expectPathnameNot', (value) => {
  return cy.location('pathname').should('not.eq', value)
})

Cypress.Commands.add('login', () => {
  const options = {
    method: 'POST',
    url: `${Cypress.env('api_base')}/login`,
    body: {
      email: Cypress.env('auth_email'),
      password: Cypress.env('auth_password'),
    },
    headers: {
      'Content-Type': 'application/json',
    },
  }
  cy.request(options).then((response: any) => {
    const { setValue: setToken } = StorageManager('token')
    const { setValue: setUser } = StorageManager('user')
    setToken(response.body.token)
    setUser(response.body.user)
  })
})
