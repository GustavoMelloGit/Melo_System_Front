import { type HttpMethods } from '../../../../shared/types/HttpMethods'

export type PermissionModel = {
  method: HttpMethods
  route: string
  description: string
}

export type WithPermissions<T> = T & {
  permissions: PermissionModel[]
}
