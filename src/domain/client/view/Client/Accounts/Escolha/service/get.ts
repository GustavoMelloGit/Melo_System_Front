import useFetch from '../../../../../../../shared/hooks/useFetch'
import { type GetListResponse } from '../../../../../../../shared/types/service/GetListResponse'
import { type SWRServiceResponse } from '../../../../../../../shared/types/service/SWRServiceResponse'
import { type EscolhaTransactionModel } from '../../../../../types/model/Transaction'

export function useGetEscolhaAccountService(
  clientId: string | undefined,
  params?: string,
): SWRServiceResponse<GetListResponse<EscolhaTransactionModel[]>> {
  const response = useFetch<GetListResponse<EscolhaTransactionModel[]>>(
    clientId ? `/transactions/escolha/${clientId}?${params ?? ''}` : null,
  )

  return response
}
