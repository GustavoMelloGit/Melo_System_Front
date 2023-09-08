import { type Timestamp } from '../../../../shared/types/Timestamp'
import { type WithId } from '../../../../shared/types/WithId'

export type UserRole = 'admin' | 'user'
export type UserModel = WithId<
  {
    nickname: string
    name: string
    role: UserRole
  } & Timestamp
>
