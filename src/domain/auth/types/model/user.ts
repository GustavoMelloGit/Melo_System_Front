import { type Timestamp } from '../../../../shared/types/utils/model'

export type UserModel = {
  email: string
  name: string
  role: 'admin' | 'user'
} & Timestamp
