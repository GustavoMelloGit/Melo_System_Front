import useFetch from '../../../../../../../shared/hooks/useFetch'
import {
  type HTTPGetResponse,
  type SWRServiceResponse,
} from '../../../../../../../shared/types/utils/service'
import { type SacariaTransactionModel } from '../../../../../types/model/Transaction'

export function getSacariaAccountService(
  clientId: string | undefined,
  params?: string,
): SWRServiceResponse<SacariaTransactionModel[]> {
  const response = useFetch<HTTPGetResponse<SacariaTransactionModel[]>>(
    clientId ? `/transactions/bags/${clientId}?${params ?? ''}` : null,
  )

  return response
}
