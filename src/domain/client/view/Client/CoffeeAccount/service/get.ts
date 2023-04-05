import { errorHandler } from '../../../../../../lib/utils/error'
import useFetch from '../../../../../../shared/hooks/useFetch'
import { type GetServiceSwrResponse } from '../../../../../../shared/types/utils/service'
import { type CoffeeTransactionModel } from '../../../../types/model/Transaction'

export function getCoffeeAccountService(
  clientId: string | undefined,
  params?: string,
): GetServiceSwrResponse<CoffeeTransactionModel[]> {
  const { data, error, isLoading, mutate } = useFetch(
    clientId ? `/transactions/coffee/${clientId}?${params ?? ''}` : null,
  )

  return {
    data: data?.data ?? [],
    error: errorHandler(error),
    isLoading,
    total: data?.total ?? 0,
    mutate,
  }
}
