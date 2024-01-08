import {
  clientFormCommonFields,
  clientFormCommonFieldsValues,
  clientFormLegalPersonFields,
  clientFormLegalPersonFieldsValues,
  clientFormNaturalPersonFields,
  clientFormNaturalPersonFieldsValues,
  clientFormRequiredFields,
  clientFormRequiredFieldsValues,
} from '../../constants/Client/client'

// Common Fields
export function fillClientFormRequiredFields(): string[] {
  return clientFormRequiredFields.map((field) => {
    const value = clientFormRequiredFieldsValues.get(field)
    cy.dataCy(field).clear()
    cy.dataCy(field).type(value)
    return value
  })
}
export function clearClientFormRequiredFields() {
  clientFormRequiredFields.forEach((field) => {
    cy.dataCy(field).clear()
  })
}

export function fillClientFormCommonFields(): string[] {
  cy.dataCy('address-accordion').click()
  const values = clientFormCommonFields.map((field) => {
    const value = clientFormCommonFieldsValues.get(field)
    cy.dataCy(field).clear()
    cy.dataCy(field).type(value)
    return value
  })
  cy.dataCy('address-accordion').click()
  return values
}

export function clearClientFormCommonFields() {
  cy.dataCy('address-accordion').click()
  clientFormCommonFields.forEach((field) => {
    cy.dataCy(field).clear()
  })
  cy.dataCy('address-accordion').click()
}

// Natural Person
export function fillClientFormNaturalPersonAllFields(): string[] {
  const commonFields = fillClientFormCommonFields()
  const naturalPersonFields = fillClientFormNaturalPersonFields()

  return [...commonFields, ...naturalPersonFields]
}
export function fillClientFormNaturalPersonFields(): string[] {
  cy.dataCy('client-person-type-input').select('fisica')
  cy.dataCy('client-personType-accordion').click()
  const values = clientFormNaturalPersonFields.map((field) => {
    const value = clientFormNaturalPersonFieldsValues.get(field)
    cy.dataCy(field).clear()
    cy.dataCy(field).type(value)
    return value
  })
  cy.dataCy('client-personType-accordion').click()
  return values
}

// Legal Person
export function fillClientFormLegalPersonFields(): string[] {
  cy.dataCy('client-person-type-input').select('juridica')
  cy.dataCy('client-personType-accordion').click()
  const values = clientFormLegalPersonFields.map((field) => {
    const value = clientFormLegalPersonFieldsValues.get(field)
    cy.dataCy(field).clear()
    cy.dataCy(field).type(value)
    return value
  })
  cy.dataCy('client-personType-accordion').click()

  return values
}
export function fillClientFormLegalPersonAllFields(): string[] {
  const commonFields = fillClientFormCommonFields()
  const legalPersonFields = fillClientFormLegalPersonFields()
  return [...commonFields, ...legalPersonFields]
}
