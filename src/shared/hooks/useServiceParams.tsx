import { PaginationParams } from '../../lib/constants/pagination'
import useURLSearchParams from './useURLSearchParams'

function buildSearchParams(key: string, value: string): string {
  return new URLSearchParams({
    [key]: value,
  }).toString()
}

export default function useServiceParams(): any {
  const { getParam } = useURLSearchParams()
  let params: string = ''

  const skip = getParam(PaginationParams.page)
  const limit = getParam(PaginationParams.rowsPerPage)

  if (skip) {
    params += buildSearchParams(PaginationParams.page, skip)
  }
  if (limit) {
    params += buildSearchParams(PaginationParams.rowsPerPage, limit)
  }
  const queryParam = getParam('query')
  const searchForParam = getParam('searchFor')

  if (queryParam && searchForParam) {
    params += buildSearchParams(searchForParam, queryParam)
  }

  return params
}
