import useFetch, { type UseFetch } from '../../../../shared/hooks/useFetch'
import { type GetListResponse } from '../../../../shared/types/service/GetListResponse'
import { type SWRServiceResponse } from '../../../../shared/types/service/SWRServiceResponse'
import { type SheetModel } from '../../types/model/sheet'
import { GetSheetInputDto, GetSheetsInputDto } from './SheetService.dto'

export function useGetSheetsService({
  bookNumber,
  params,
}: GetSheetsInputDto): SWRServiceResponse<GetListResponse<SheetModel[]>> {
  const searchParams = new URLSearchParams(params)
  if (bookNumber) searchParams.append('bookNumber', String(bookNumber))

  const response = useFetch<GetListResponse<SheetModel[]>>(`/sheets?${searchParams.toString()}`)

  return response
}

export function useGetSheetService(data?: GetSheetInputDto): UseFetch<SheetModel, any> {
  const response = useFetch<SheetModel>(
    data ? `/sheet/${data.bookNumber}/${data.sheetNumber}` : null,
  )

  return response
}
