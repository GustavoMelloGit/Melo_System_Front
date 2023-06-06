import useFetch from '../../../../shared/hooks/useFetch'
import {
  type HTTPGetResponse,
  type SWRServiceResponse,
} from '../../../../shared/types/utils/service'
import { type BookModel } from '../../types/model/book'

export function getBooksService(params?: string): SWRServiceResponse<HTTPGetResponse<BookModel[]>> {
  const response = useFetch<HTTPGetResponse<BookModel[]>>(`/books?${params ?? ''}`)

  return response
}
