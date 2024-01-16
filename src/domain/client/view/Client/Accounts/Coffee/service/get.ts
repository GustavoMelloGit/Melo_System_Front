import useFetch from '../../../../../../../shared/hooks/useFetch'
import { type GetListResponse } from '../../../../../../../shared/types/service/GetListResponse'
import { type SWRServiceResponse } from '../../../../../../../shared/types/service/SWRServiceResponse'

import { type CoffeeTransactionModel } from '../../../../../types/model/Transaction'

export function useGetCoffeeAccountService(
  clientId: string | undefined,
  accountType: string,
  params?: string,
): SWRServiceResponse<GetListResponse<CoffeeTransactionModel[]>> {
  const response = useFetch<GetListResponse<CoffeeTransactionModel[]>>(
    clientId ? `/transactions/${accountType}/${clientId}?${params ?? ''}` : null,
  )

  return response
}
