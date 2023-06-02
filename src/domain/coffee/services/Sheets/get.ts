import { errorHandler } from '../../../../lib/utils/error'
import useFetch from '../../../../shared/hooks/useFetch'
import {
  type HTTPGetResponse,
  type SWRServiceResponse,
} from '../../../../shared/types/utils/service'
import { type SheetModel } from '../../types/model/sheet'

export function getSheetsService(
  bookNumber: string | number | undefined,
  params?: string,
): SWRServiceResponse<SheetModel[]> {
  const response = useFetch<HTTPGetResponse<SheetModel[]>>(
    bookNumber ? `/sheets/${bookNumber}?${params ?? ''}` : null,
  )

  return response
}

export function getSheetService(
  sheetNumber: string | number | undefined,
): SWRServiceResponse<SheetModel> {
  const { data, error, isLoading, mutate } = useFetch(sheetNumber ? `/sheet/${sheetNumber}` : null)

  return {
    data,
    error: errorHandler(error),
    isLoading,
    mutate,
  }
}
