import { errorHandler } from '../../../../../../../lib/utils/error'
import useFetch from '../../../../../../../shared/hooks/useFetch'
import { type GetServiceSwrResponse } from '../../../../../../../shared/types/utils/service'
import { type TransactionModel } from '../../../../../types/model/Transaction'

export function getCoffeeAccountService(
  clientId: string,
  params?: string,
): GetServiceSwrResponse<TransactionModel[]> {
  const { data, error, isLoading, mutate } = useFetch(
    `/transactions/currency/${clientId}?${params ?? ''}`,
  )

  return {
    data: data?.data ?? [],
    error: errorHandler(error),
    isLoading,
    total: data?.total ?? 0,
    mutate,
  }
}
