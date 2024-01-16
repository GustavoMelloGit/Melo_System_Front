import useFetch from '../../../../shared/hooks/useFetch'
import { type GetListResponse } from '../../../../shared/types/service/GetListResponse'
import { type SWRServiceResponse } from '../../../../shared/types/service/SWRServiceResponse'
import { type BookModel } from '../../types/model/book'

export function useGetBooksService(
  params?: string,
): SWRServiceResponse<GetListResponse<BookModel[]>> {
  const response = useFetch<GetListResponse<BookModel[]>>(`/books?${params ?? ''}`)

  return response
}
