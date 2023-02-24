import { validationErrors } from '../../../../src/lib/errors'
import { Routes } from '../../../../src/lib/routes'

describe('Auth domain', () => {
  it('should redirect unauthenticated user to login page', () => {
    cy.visit(Routes.home)
    cy.expectPathname(Routes.login)
  })
  it('should render page', () => {
    cy.visit(Routes.login)
    cy.dataCy('login-page').should('exist')
  })
  it('should make a successful login', () => {
    cy.visit(Routes.login)
    cy.dataCy('email-input').type(Cypress.env('auth_email'))
    cy.dataCy('password-input').type(Cypress.env('auth_password'))
    cy.dataCy('submit').click()
    cy.expectPathnameNot(Routes.login)
  })
  it('should show error on invalid credentials', () => {
    cy.visit(Routes.login)
    cy.dataCy('email-input').type('admin@test.com')
    cy.dataCy('password-input').type('123456')
    cy.dataCy('submit').click()
    cy.get('.toaster').should('exist')
  })
  it('should show email validation error', () => {
    cy.visit(Routes.login)
    cy.dataCy('email-input').type('admin.com')
    cy.dataCy('password-input').type('123456')
    cy.dataCy('submit').click()
    cy.contains(validationErrors.emailIsInvalid).should('exist')
  })
  it('should show form validation error', () => {
    cy.visit(Routes.login)
    cy.dataCy('submit').click()
    cy.contains(validationErrors.emailIsRequired).should('exist')
    cy.contains(validationErrors.passwordIsRequired).should('exist')
  })
  it.only('should be able to logout', () => {
    cy.login()
    cy.visit(Routes.home)
    cy.dataCy('logout-button').click()
    cy.expectPathname(Routes.login)
  })
})
