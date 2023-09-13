import { type HttpMethods } from '../../../../../shared/types/HttpMethods'

export type UsersPermissionsFormValues = Record<
  string,
  Array<{
    method: HttpMethods
    route: string
    allowed: boolean
  }>
>
