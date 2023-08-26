export type GetServiceResponse<T> = Promise<{
  data: T | null
  error: string | null
}>
