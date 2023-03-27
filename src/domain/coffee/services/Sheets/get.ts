import { errorHandler } from '../../../../lib/utils/error'
import useFetch from '../../../../shared/hooks/useFetch'
import { type GetServiceSwrResponse } from '../../../../shared/types/utils/service'
import { type SheetModel } from '../../types/model/sheet'

export function getSheetsService(
  bookNumber: string | number | undefined,
  params?: string,
): GetServiceSwrResponse<SheetModel[]> {
  const { data, error, isLoading, mutate } = useFetch(
    bookNumber ? `/sheets/${bookNumber}?${params ?? ''}` : null,
  )

  return {
    data: data?.data,
    error: errorHandler(error),
    isLoading,
    total: data?.total,
    mutate,
  }
}
