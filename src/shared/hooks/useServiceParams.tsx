import { type URLSearchParamsInit } from 'react-router-dom'
import { PaginationParams } from '../../lib/constants/pagination'
import useURLSearchParams from './useURLSearchParams'

export default function useServiceParams(defaultValues?: URLSearchParamsInit): string {
  const { getParam } = useURLSearchParams(defaultValues)
  const params = new URLSearchParams()

  const skip = getParam(PaginationParams.page)
  const limit = getParam(PaginationParams.rowsPerPage)

  if (skip) {
    params.append(PaginationParams.page, (+skip - 1).toString())
  }
  if (limit) {
    params.append(PaginationParams.rowsPerPage, limit)
  }
  const queryParam = getParam(PaginationParams.searchBy)
  const searchForParam = getParam(PaginationParams.searchFor)

  if (queryParam && searchForParam) {
    params.append(searchForParam, queryParam)
  }

  const orderBy = getParam(PaginationParams.sortBy)
  const order = getParam(PaginationParams.sortOrder)

  if (orderBy && order) {
    params.append(PaginationParams.sortBy, orderBy)
    params.append(PaginationParams.sortOrder, order)
  }

  const status = getParam('status')
  if (status) params.append('status', status)

  return params.toString()
}
