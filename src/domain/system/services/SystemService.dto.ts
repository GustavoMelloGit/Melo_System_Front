import { type HttpMethods } from '../../../shared/types/HttpMethods'

export type CreateUserData = {
  name: string
  nickname: string
  password: string
  role: 'admin' | 'user'
}

export type UserPermissionData = {
  id: string
  permissions: Array<{
    method: HttpMethods
    route: string
  }>
}
