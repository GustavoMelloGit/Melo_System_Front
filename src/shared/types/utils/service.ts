import { type UseFetch } from '../../hooks/useFetch'

export type PostServiceResponse<T> = Promise<{
  data: T | null
  error: string | null
}>

export type PutServiceResponse<T> = Promise<{
  data: T | null
  error: string | null
}>

export type DeleteServiceResponse = Promise<{
  error: string | null
}>

export type SWRServiceResponse<T> = UseFetch<HTTPGetResponse<T>, any>

export type HTTPGetResponse<T> = {
  data: T
  limit: number
  page: number
  total: number
}
