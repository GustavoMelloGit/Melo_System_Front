import useFetch from '../../../../../../../shared/hooks/useFetch'
import {
  type HTTPGetResponse,
  type SWRServiceResponse,
} from '../../../../../../../shared/types/utils/service'
import { type EscolhaTransactionModel } from '../../../../../types/model/Transaction'

export function getEscolhaAccountService(
  clientId: string | undefined,
  params?: string,
): SWRServiceResponse<EscolhaTransactionModel[]> {
  const response = useFetch<HTTPGetResponse<EscolhaTransactionModel[]>>(
    clientId ? `/transactions/escolha/${clientId}?${params ?? ''}` : null,
  )

  return response
}
