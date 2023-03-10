import {
  pickupFormRequiredFields,
  pickupFormRequiredFieldsValues,
} from '../../constants/Coffee/pickup'

export function fillPickupFormRequiredFields(): string[] {
  return pickupFormRequiredFields.map((field) => {
    const value = pickupFormRequiredFieldsValues.get(field)
    cy.dataCy(field).clear()
    cy.dataCy(field).type(value)
    return value
  })
}
