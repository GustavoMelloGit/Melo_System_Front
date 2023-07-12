import useFetch from '../../../../../../../shared/hooks/useFetch'
import {
  type GetListResponse,
  type SWRServiceResponse,
} from '../../../../../../../shared/types/utils/service'
import { type SacariaTransactionModel } from '../../../../../types/model/Transaction'

export function getSacariaAccountService(
  clientId: string | undefined,
  params?: string,
): SWRServiceResponse<GetListResponse<SacariaTransactionModel[]>> {
  const response = useFetch<GetListResponse<SacariaTransactionModel[]>>(
    clientId ? `/transactions/bags/${clientId}?${params ?? ''}` : null,
  )

  return response
}
