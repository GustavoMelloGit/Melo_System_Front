import { type UserModel } from '../../../domain/auth/types/model/user'

export type Timestamp = {
  createdAt: number
  updatedAt: number
  deletedAt?: number
}

export type Responsible = {
  userId: string
  user?: UserModel
}

export type WithId<T> = T & { id: string }
