import { type Timestamp } from '../../../../shared/types/Timestamp'
import { type WithId } from '../../../../shared/types/WithId'
import { type PermissionModel } from './permission'

export type UserRole = 'admin' | 'user'

export type UserPermission = Pick<PermissionModel, 'method' | 'route'>
export type UserModel = WithId<
  {
    nickname: string
    name: string
    role: UserRole
    permissions: UserPermission[]
  } & Timestamp
>
