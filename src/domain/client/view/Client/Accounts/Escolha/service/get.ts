import useFetch from '../../../../../../../shared/hooks/useFetch'
import {
  type GetListResponse,
  type SWRServiceResponse,
} from '../../../../../../../shared/types/utils/service'
import { type EscolhaTransactionModel } from '../../../../../types/model/Transaction'

export function getEscolhaAccountService(
  clientId: string | undefined,
  params?: string,
): SWRServiceResponse<GetListResponse<EscolhaTransactionModel[]>> {
  const response = useFetch<GetListResponse<EscolhaTransactionModel[]>>(
    clientId ? `/transactions/escolha/${clientId}?${params ?? ''}` : null,
  )

  return response
}
