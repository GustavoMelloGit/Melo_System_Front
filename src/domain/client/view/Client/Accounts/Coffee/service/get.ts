import useFetch from '../../../../../../../shared/hooks/useFetch'
import {
  type GetListResponse,
  type SWRServiceResponse,
} from '../../../../../../../shared/types/utils/service'
import { type CoffeeTransactionModel } from '../../../../../types/model/Transaction'

export function getCoffeeAccountService(
  clientId: string | undefined,
  params?: string,
): SWRServiceResponse<GetListResponse<CoffeeTransactionModel[]>> {
  const response = useFetch<GetListResponse<CoffeeTransactionModel[]>>(
    clientId ? `/transactions/coffee/${clientId}?${params ?? ''}` : null,
  )

  return response
}
