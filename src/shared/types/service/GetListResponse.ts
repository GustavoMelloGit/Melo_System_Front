export type GetListResponse<T, M = undefined> = {
  data: T
  limit: number
  page: number
  total: number
  meta?: M
}
