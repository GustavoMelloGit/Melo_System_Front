import { validationErrors } from '../../../../src/lib/errors'
import { Routes } from '../../../../src/lib/routes'

describe('Auth domain', () => {
  beforeEach(() => {
    cy.visit(Routes.login)
  })
  it('should redirect unauthenticated user to login page', () => {
    cy.visit(Routes.home)
    cy.expectPathname(Routes.login)
  })
  it('should render page', () => {
    cy.dataCy('login-page').should('exist')
  })
  it('should make a successful login', () => {
    cy.dataCy('email-input').type('admin@admin.com')
    cy.dataCy('password-input').type('123456')
    cy.dataCy('submit').click()
    cy.expectPathnameNot(Routes.login)
  })
  it('should show error on invalid credentials', () => {
    cy.dataCy('email-input').type('admin@test.com')
    cy.dataCy('password-input').type('123456')
    cy.dataCy('submit').click()
    cy.get('.toaster').should('exist')
  })
  it('should show email validation error', () => {
    cy.dataCy('email-input').type('admin.com')
    cy.dataCy('password-input').type('123456')
    cy.dataCy('submit').click()
    cy.contains(validationErrors.emailIsInvalid).should('exist')
  })
  it('should show form validation error', () => {
    cy.dataCy('submit').click()
    cy.contains(validationErrors.emailIsRequired).should('exist')
    cy.contains(validationErrors.passwordIsRequired).should('exist')
  })
  it('should be able to logout', () => {
    cy.dataCy('email-input').type('admin@admin.com')
    cy.dataCy('password-input').type('123456')
    cy.dataCy('submit').click()
    cy.get('[data-cy="logout"]').click()
  })
})
