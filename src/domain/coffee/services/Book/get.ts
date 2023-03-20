import { errorHandler } from '../../../../lib/utils/error'
import useFetch from '../../../../shared/hooks/useFetch'
import { type GetServiceResponse } from '../../../../shared/types/utils/service'
import { type BookModel } from '../../types/model/book'

export function getBooksService(params?: string): GetServiceResponse<BookModel[]> {
  const { data, error, isLoading, mutate } = useFetch(`/books?${params ?? ''}`)

  return {
    data: data?.data,
    error: errorHandler(error),
    isLoading,
    total: data?.total,
    mutate,
  }
}
