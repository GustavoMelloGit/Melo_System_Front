import { type KeyedMutator } from 'swr'

export type PostServiceResponse<T> = Promise<
  | {
      data: T
      error: null
    }
  | {
      data: null
      error: string
    }
>

export type PutServiceResponse<T> = Promise<
  | {
      data: T
      error: null
    }
  | {
      data: null
      error: string
    }
>

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
