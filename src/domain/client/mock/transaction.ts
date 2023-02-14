import { faker } from '@faker-js/faker'
import { type TransactionModel } from '../types/model/Transaction'

/**
 * Create a mock transaction
 * @returns {TransactionModel} Mocked transaction
 */
function createMockTransaction(): TransactionModel {
  return {
    id: faker.datatype.uuid(),
    value: faker.datatype.number(),
    description: faker.lorem.paragraph(),
    createdAt: faker.date.past().toString(),
    updatedAt: faker.date.past().toString(),
    clientId: faker.datatype.uuid(),
    date: faker.date.past().toString(),
    userId: faker.datatype.uuid(),
  }
}

/**
 * Create a list of mock transactions
 * @param amount Number of transactions to be mocked
 * @returns {TransactionModel[]} Array of mocked transactions
 */
export function createMockListTransaction(amount?: number): TransactionModel[] {
  return Array.from({ length: amount ?? 10 }, () => createMockTransaction())
}

export default createMockTransaction
