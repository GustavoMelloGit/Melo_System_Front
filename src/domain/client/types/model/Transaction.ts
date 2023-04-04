import { type Timestamp } from '../../../../shared/types/utils/model'
import { type UserModel } from '../../../auth/types/model/user'

export type TransactionModel = {
  clientBalance: number
  clientId: string
  date: number
  description: string
  userId: string
  user: UserModel
  type: TransactionType
  id: string
} & Timestamp

export type TransactionType = {
  name: string
  value: number
}
