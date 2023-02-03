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

  const orderBy = getParam('field')
  const order = getParam('order')

  if (orderBy && order) {
    params.append('field', orderBy)
    params.append('order', order)
  }

  return params.toString()
}
