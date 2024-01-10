/// <reference types="cypress" />
import { type SignInResponse } from '../../src/domain/auth/types'
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
  const nickname = Cypress.env('auth_nickname')
  const password = Cypress.env('auth_password')

  const options = {
    method: 'POST',
    url: `${Cypress.env('api_base')}/login`,
    body: {
      nickname,
      password,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  }

  cy.session([nickname, password], () => {
    cy.request(options).then((response: { body: SignInResponse }) => {
      const { setValue: setToken } = StorageManager('token')
      const { setValue: setUser } = StorageManager('user')
      setToken(response.body.token)
      setUser(response.body.user)
    })
  })
})
