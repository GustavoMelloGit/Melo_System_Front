import { PaginationParams } from '../../lib/constants/pagination'
import useURLSearchParams from './useURLSearchParams'

export default function useServiceParams(): any {
  const { getParam } = useURLSearchParams()
  const params = new URLSearchParams()

  const skip = getParam(PaginationParams.page)
  const limit = getParam(PaginationParams.rowsPerPage)

  if (skip) {
    params.append(PaginationParams.page, (+skip - 1).toString())
  }
  if (limit) {
    params.append(PaginationParams.rowsPerPage, limit)
  }
  const queryParam = getParam('query')
  const searchForParam = getParam('searchFor')

  if (queryParam && searchForParam) {
    params.append(searchForParam, queryParam)
  }

  return params.toString()
}
