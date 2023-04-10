import { type KeyedMutator } from 'swr'

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

export type GetServiceResponse<T> = {
  data?: T
  error?: string
  isLoading: boolean
  total?: number
}

export type GetServiceSwrResponse<T> = GetServiceResponse<T> & {
  mutate: KeyedMutator<T>
}
