import useFetch from '../../../../../../../shared/hooks/useFetch'
import { type GetListResponse } from '../../../../../../../shared/types/service/GetListResponse'
import { type SWRServiceResponse } from '../../../../../../../shared/types/service/SWRServiceResponse'
import { type FertilizerTransactionModel } from '../../../../../types/model/Transaction'

export function useGetFertilizerTransactionService(
  clientId: string | undefined,
  params?: string,
): SWRServiceResponse<GetListResponse<FertilizerTransactionModel[]>> {
  const response = useFetch<GetListResponse<FertilizerTransactionModel[]>>(
    clientId ? `/transactions/fertilizer/${clientId}?${params ?? ''}` : null,
  )

  return response
}
