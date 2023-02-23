import { validationErrors } from '../../../../src/lib/errors'
import { Routes } from '../../../../src/lib/routes'

describe('Auth domain', () => {
  beforeEach(() => {
    cy.visit(Routes.login)
  })
  it('should redirect unauthenticated user to login page', () => {
    cy.visit(Routes.home)
    cy.location('pathname').should('eq', Routes.login)
  })
  it('should render page', () => {
    cy.get('[data-cy="login-page"]').should('exist')
  })
  it('should make a successful login', () => {
    cy.get('[data-cy="email-input"]').type('admin@admin.com')
    cy.get('[data-cy="password-input"]').type('123456')
    cy.get('[data-cy="submit"]').click()
    cy.location('pathname').should('not.be', Routes.login)
  })
  it('should show error on invalid credentials', () => {
    cy.get('[data-cy="email-input"]').type('admin@test.com')
    cy.get('[data-cy="password-input"]').type('123456')
    cy.get('[data-cy="submit"]').click()
    cy.get('.toaster').should('exist')
  })
  it('should show email validation error', () => {
    cy.get('[data-cy="email-input"]').type('admin.com')
    cy.get('[data-cy="password-input"]').type('123456')
    cy.get('[data-cy="submit"]').click()
    cy.contains(validationErrors.emailIsInvalid).should('exist')
  })
  it('should show form validation error', () => {
    cy.get('[data-cy="submit"]').click()
    cy.contains(validationErrors.emailIsRequired).should('exist')
    cy.contains(validationErrors.passwordIsRequired).should('exist')
  })
})
