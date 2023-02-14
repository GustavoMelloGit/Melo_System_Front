import { faker } from '@faker-js/faker'
import { type ClientModel } from '../types/model/Client'

/**
 * Create a mock client
 * @returns {ClientModel} Mocked client
 */
function createMockUser(): ClientModel {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    address: {
      brook: faker.address.streetName(),
      city: faker.address.city(),
      complement: faker.address.secondaryAddress(),
      neighborhood: faker.address.county(),
      number: String(faker.datatype.number()),
      state: faker.address.state(),
      street: faker.address.streetName(),
      zipCode: faker.address.zipCode(),
    },
    balance: faker.datatype.number(),
    description: faker.lorem.paragraph(),
    nickname: faker.name.firstName(),
    personType: {
      type: 'fisica',
      birthDate: faker.date.past().toString(),
      cpf: String(faker.datatype.number()),
      rg: String(faker.datatype.number()),
      fatherName: faker.name.firstName(),
      motherName: faker.name.firstName(),
      producerRegistration: String(faker.datatype.number()),
      rgEmissionDate: faker.date.past().toString(),
    },
    profileImage: faker.image.avatar(),
    contact: {
      phone: faker.phone.phoneNumber(),
    },
    createdAt: faker.date.past().toString(),
    updatedAt: faker.date.past().toString(),
  }
}

/**
 * Create a list of mock clients
 * @param amount Number of clients to be mocked
 * @returns {ClientModel[]} Array of mocked clients
 */
export function createMockListUser(amount?: number): ClientModel[] {
  return Array.from({ length: amount ?? 10 }, () => createMockUser())
}

export default createMockUser
