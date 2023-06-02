import useFetch from '../../../../../../../shared/hooks/useFetch'
import {
  type HTTPGetResponse,
  type SWRServiceResponse,
} from '../../../../../../../shared/types/utils/service'
import { type CoffeeTransactionModel } from '../../../../../types/model/Transaction'

export function getCoffeeAccountService(
  clientId: string | undefined,
  params?: string,
): SWRServiceResponse<CoffeeTransactionModel[]> {
  const response = useFetch<HTTPGetResponse<CoffeeTransactionModel[]>>(
    clientId ? `/transactions/coffee/${clientId}?${params ?? ''}` : null,
  )

  return response
}
