import { type KeyedMutator } from 'swr'

export type PostServiceResponse<T> =
  | {
      data: T
      error: null
    }
  | {
      data: null
      error: string
    }

export type PutServiceResponse<T> =
  | {
      data: T
      error: null
    }
  | {
      data: null
      error: string
    }

export type GetServiceResponse<T> = {
  data?: T
  error?: string
  isLoading: boolean
  total?: number
  mutate?: KeyedMutator<T>
}
