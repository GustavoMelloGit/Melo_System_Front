import useFetch from '../../../../shared/hooks/useFetch'
import {
  type GetListResponse,
  type SWRServiceResponse,
} from '../../../../shared/types/utils/service'
import { type BookModel } from '../../types/model/book'

export function getBooksService(params?: string): SWRServiceResponse<GetListResponse<BookModel[]>> {
  const response = useFetch<GetListResponse<BookModel[]>>(`/books?${params ?? ''}`)

  return response
}
