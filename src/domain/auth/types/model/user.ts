import { type Timestamp } from '../../../../shared/types/Timestamp'
import { type WithId } from '../../../../shared/types/WithId'
import { type WithPermissions } from './permission'

export type UserRole = 'admin' | 'user'
export type UserModel = WithPermissions<
  WithId<
    {
      nickname: string
      name: string
      role: UserRole
    } & Timestamp
  >
>
