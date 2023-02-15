import { type UserModel } from '../../../auth/types/model/user'

export type TransactionModel = {
  clientBalance: number
  clientId: string
  createdAt: string
  date: string
  description: string
  updatedAt: string
  userId: string
  user: UserModel
  value: number
  id: string
}
