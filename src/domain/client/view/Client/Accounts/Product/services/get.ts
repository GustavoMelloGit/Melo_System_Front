import useFetch from '../../../../../../../shared/hooks/useFetch'
import { type GetListResponse } from '../../../../../../../shared/types/service/GetListResponse'
import { type SWRServiceResponse } from '../../../../../../../shared/types/service/SWRServiceResponse'
import { type ProductTransactionModel } from '../../../../../types/model/Transaction'

export function getFertilizerTransactionService(
  clientId: string | undefined,
  params?: string,
): SWRServiceResponse<GetListResponse<ProductTransactionModel[]>> {
  const response = useFetch<GetListResponse<ProductTransactionModel[]>>(
    clientId ? `/transactions/fertilizer/${clientId}?${params ?? ''}` : null,
  )

  return response
}
