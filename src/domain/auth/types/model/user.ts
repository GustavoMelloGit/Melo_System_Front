import { type Timestamp } from '../../../../shared/types/utils/model'

export type UserModel = {
  nickname: string
  name: string
  role: 'admin' | 'user'
} & Timestamp
