import { type Timestamp } from '../../../../shared/types/Timestamp'

export type UserModel = {
  nickname: string
  name: string
  role: 'admin' | 'user'
} & Timestamp
