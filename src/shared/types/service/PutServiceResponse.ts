export type PutServiceResponse<T> = Promise<{
  data: T | null
  error: string | null
}>
