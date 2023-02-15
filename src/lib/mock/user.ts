import { faker } from '@faker-js/faker'
import { type UserModel } from '../../domain/auth/types/model/user'

/**
 * Create a mock user
 * @returns {UserModel} Mocked user
 */
export function createMockUser(): UserModel {
  return {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    isAuthenticated: true,
    role: 'admin',
  }
}

/**
 * Create a list of mock users
 * @param amount Number of users to be mocked
 * @returns {UserModel[]} Array of mocked users
 */
export function createMockListUser(amount?: number): UserModel[] {
  return Array.from({ length: amount ?? 10 }, () => createMockUser())
}
