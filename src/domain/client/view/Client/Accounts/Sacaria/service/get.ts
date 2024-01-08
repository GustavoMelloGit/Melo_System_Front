import useFetch from '../../../../../../../shared/hooks/useFetch'
import { type GetListResponse } from '../../../../../../../shared/types/service/GetListResponse'
import { type SWRServiceResponse } from '../../../../../../../shared/types/service/SWRServiceResponse'

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
