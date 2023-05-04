import { errorHandler } from '../../../../../../../lib/utils/error'
import useFetch from '../../../../../../../shared/hooks/useFetch'
import { type GetServiceSwrResponse } from '../../../../../../../shared/types/utils/service'
import { type SacariaTransactionModel } from '../../../../../types/model/Transaction'

export function getSacariaAccountService(
  clientId: string | undefined,
  params?: string,
): GetServiceSwrResponse<SacariaTransactionModel[]> {
  const { data, error, isLoading, mutate } = useFetch(
    clientId ? `/transactions/bags/${clientId}?${params ?? ''}` : null,
  )

  return {
    data: data?.data ?? [],
    error: errorHandler(error),
    isLoading,
    total: data?.total ?? 0,
    mutate,
  }
}
