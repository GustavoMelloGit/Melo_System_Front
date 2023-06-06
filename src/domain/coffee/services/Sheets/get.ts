import useFetch, { type UseFetch } from '../../../../shared/hooks/useFetch'
import {
  type HTTPGetResponse,
  type SWRServiceResponse,
} from '../../../../shared/types/utils/service'
import { type SheetModel } from '../../types/model/sheet'

export function getSheetsService(
  bookNumber: string | number | undefined,
  params?: string,
): SWRServiceResponse<HTTPGetResponse<SheetModel[]>> {
  const response = useFetch<HTTPGetResponse<SheetModel[]>>(
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
