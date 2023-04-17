import { errorHandler } from '../../../../../../../lib/utils/error'
import useFetch from '../../../../../../../shared/hooks/useFetch'
import { type GetServiceSwrResponse } from '../../../../../../../shared/types/utils/service'
import { type EscolhaTransactionModel } from '../../../../../types/model/Transaction'

export function getEscolhaAccountService(
  clientId: string | undefined,
  params?: string,
): GetServiceSwrResponse<EscolhaTransactionModel[]> {
  const { data, error, isLoading, mutate } = useFetch(
    clientId ? `/transactions/escolha/${clientId}?${params ?? ''}` : null,
  )

  return {
    data: data?.data ?? [],
    error: errorHandler(error),
    isLoading,
    total: data?.total ?? 0,
    mutate,
  }
}
