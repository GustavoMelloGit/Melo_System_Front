import useFetch, { type UseFetch } from '../../../../shared/hooks/useFetch'
import { type GetListResponse } from '../../../../shared/types/service/GetListResponse'
import { type SWRServiceResponse } from '../../../../shared/types/service/SWRServiceResponse'
import { type SheetModel } from '../../types/model/sheet'

type GetSheetServicesData = {
  bookNumber?: string | number
  params?: string
}
export function getSheetsService({
  bookNumber,
  params,
}: GetSheetServicesData): SWRServiceResponse<GetListResponse<SheetModel[]>> {
  const response = useFetch<GetListResponse<SheetModel[]>>(
    `/sheets?${bookNumber ? `bookNumber=${bookNumber}&` : ''}${params ?? ''}`,
  )

  return response
}

type GetSheetServiceData = {
  sheetNumber: string | number
  bookNumber: string | number
}
export function getSheetService(data?: GetSheetServiceData): UseFetch<SheetModel, any> {
  const response = useFetch<SheetModel>(
    data ? `/sheet/${data.bookNumber}/${data.sheetNumber}` : null,
  )

  return response
}
