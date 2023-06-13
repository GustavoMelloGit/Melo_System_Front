import useFetch from '../../../../../../../shared/hooks/useFetch'
import {
  type HTTPGetResponse,
  type SWRServiceResponse,
} from '../../../../../../../shared/types/utils/service'
import { type FertilizerTransactionModel } from '../../../../../types/model/Transaction'

export function getFertilizerTransactionService(
  clientId: string | undefined,
  params?: string,
): SWRServiceResponse<HTTPGetResponse<FertilizerTransactionModel[]>> {
  const response = useFetch<HTTPGetResponse<FertilizerTransactionModel[]>>(
    clientId ? `/transactions/fertilizer/${clientId}?${params ?? ''}` : null,
  )

  return response
}
