import useFetch, { type UseFetch } from '../../../../shared/hooks/useFetch'
import {
  type GetListResponse,
  type SWRServiceResponse,
} from '../../../../shared/types/utils/service'
import { type SheetModel } from '../../types/model/sheet'

export function getSheetsService(
  bookNumber: string | number | undefined,
  params?: string,
): SWRServiceResponse<GetListResponse<SheetModel[]>> {
  const response = useFetch<GetListResponse<SheetModel[]>>(
    bookNumber ? `/sheets/${bookNumber}?${params ?? ''}` : null,
  )

  return response
}

export function getSheetService(
  sheetNumber: string | number | undefined,
): UseFetch<SheetModel, any> {
  const response = useFetch<SheetModel>(sheetNumber ? `/sheet/${sheetNumber}` : null)

  return response
}
