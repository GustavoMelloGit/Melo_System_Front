import { faker } from '@faker-js/faker'

export const pickupFormRequiredFields = ['clientName-input', 'bags-input', 'address-input'] as const
export const pickupFormRequiredFieldsValues = new Map([
  ['clientName-input', faker.name.firstName()],
  ['bags-input', faker.datatype.number(100).toString()],
  ['address-input', faker.address.streetAddress()],
])
