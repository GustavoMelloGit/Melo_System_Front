// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     * @see https://on.cypress.io/custom-commands
     * */
    dataCy(value: string): Chainable<JQuery<HTMLElement>>
    /**
     * Custom command to expect pathname to be equal to the given value.
     * @example cy.location('pathname').should('eq', Routes.login) -> cy.expectPathname(Routes.login)
     */
    expectPathname(value: string): Chainable<string>

    /**
     * Custom command to not expect pathname to be equal to the given value.
     * @example cy.location('pathname').should('not.eq', Routes.login) -> cy.expectPathnameNot(Routes.login)
     */
    expectPathnameNot(value: string): Chainable<string>

    /**
     * Custom command to authenticate user.
     * @example cy.login()
     */
    login(): Chainable<string>
  }
}
