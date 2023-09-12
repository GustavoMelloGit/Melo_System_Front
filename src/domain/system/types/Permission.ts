import { type HttpMethods } from '../../../shared/types/HttpMethods'

export type Permission = {
  method: HttpMethods
  route: string
  description: string
}
