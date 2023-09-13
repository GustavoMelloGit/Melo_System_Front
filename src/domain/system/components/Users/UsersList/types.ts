import { type HttpMethods } from '../../../../../shared/types/HttpMethods'

export type UsersPermissionsFormValues = Record<
  string,
  {
    [key in `${HttpMethods}%${string}`]: boolean
  }
>
