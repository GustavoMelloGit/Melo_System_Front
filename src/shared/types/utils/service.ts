export type PostServiceResponse<T> =
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
}
