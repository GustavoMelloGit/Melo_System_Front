import useFetch, { type UseFetch } from '../../../../shared/hooks/useFetch'
import {
  type GetListResponse,
  type SWRServiceResponse,
} from '../../../../shared/types/utils/service'
import { type SheetModel } from '../../types/model/sheet'

type GetSheetServiceData = {
  bookNumber?: string | number
  params?: string
}
export function getSheetsService({
  bookNumber,
  params,
}: GetSheetServiceData): SWRServiceResponse<GetListResponse<SheetModel[]>> {
  const response = useFetch<GetListResponse<SheetModel[]>>(
    `/sheets?${bookNumber ? `bookNumber=${bookNumber}&` : ''}${params ?? ''}`,
  )

  return response
}

export function getSheetService(sheetNumber?: string | number): UseFetch<SheetModel, any> {
  const response = useFetch<SheetModel>(sheetNumber ? `/sheet/${sheetNumber}` : null)

  return response
}
