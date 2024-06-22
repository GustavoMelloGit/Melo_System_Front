import { validationErrors } from '../../../../src/lib/errors'
import { Routes } from '../../../../src/lib/routes'

describe('Auth domain', () => {
  it('should redirect unauthenticated user to login page', () => {
    cy.visit(Routes.clients)
    cy.expectPathname(Routes.login)
  })
  it('should render page', () => {
    cy.visit(Routes.login)
    cy.dataCy('login-page').should('exist')
  })
  it('should make a successful login', () => {
    cy.visit(Routes.login)
    cy.dataCy('nickname-input').type(Cypress.env('auth_nickname'))
    cy.dataCy('password-input').type(Cypress.env('auth_password'))
    cy.intercept('POST', '**/login').as('login')
    cy.dataCy('submit').click()
    cy.wait('@login')
    cy.expectPathnameNot(Routes.login)
  })
  it('should show error on invalid credentials', () => {
    cy.visit(Routes.login)
    cy.dataCy('nickname-input').type('not_valid')
    cy.dataCy('password-input').type('123456')
    cy.dataCy('submit').click()
    cy.get('.toaster-error').should('exist')
  })
  it('should show form validation error', () => {
    cy.visit(Routes.login)
    cy.dataCy('submit').click()
    cy.contains(validationErrors.nicknameIsRequired).should('exist')
    cy.contains(validationErrors.passwordIsRequired).should('exist')
  })
  it('should be able to logout', () => {
    cy.login()
    cy.visit(Routes.clients)
    cy.dataCy('logout-button').click()
    cy.expectPathname(Routes.login)
  })
})
