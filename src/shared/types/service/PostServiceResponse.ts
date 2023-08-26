export type PostServiceResponse<T> = Promise<{
  data: T | null
  error: string | null
}>
