import useFetch from '../../../../../../../shared/hooks/useFetch'
import {
  type GetListResponse,
  type SWRServiceResponse,
} from '../../../../../../../shared/types/utils/service'
import { type FertilizerTransactionModel } from '../../../../../types/model/Transaction'

export function getFertilizerTransactionService(
  clientId: string | undefined,
  params?: string,
): SWRServiceResponse<GetListResponse<FertilizerTransactionModel[]>> {
  const response = useFetch<GetListResponse<FertilizerTransactionModel[]>>(
    clientId ? `/transactions/fertilizer/${clientId}?${params ?? ''}` : null,
  )

  return response
}
