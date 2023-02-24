/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

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
    window.localStorage.setItem('@melo-system:token', JSON.stringify(response.body.token))
    window.localStorage.setItem('@melo-system:user', JSON.stringify(response.body.user))
  })
})
