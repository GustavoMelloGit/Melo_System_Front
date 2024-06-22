import useFetch, { type FetchConfig } from '../../../shared/hooks/useFetch'
import { type GetListResponse } from '../../../shared/types/service/GetListResponse'
import { type SWRServiceResponse } from '../../../shared/types/service/SWRServiceResponse'
import { type FertilizerDeliveryModel } from '../types/model/Delivery'
import { type FertilizerModel } from '../types/model/Fertilizer'

export function useGetFertilizersService(
  params?: string,
  config?: FetchConfig,
): SWRServiceResponse<GetListResponse<FertilizerModel[]>> {
  const response = useFetch<GetListResponse<FertilizerModel[]>>(
    `/fertilizers?${params ?? ''}`,
    config,
  )

  return response
}

export function useGetFertilizersDeliveryService(
  params?: string,
): SWRServiceResponse<GetListResponse<FertilizerDeliveryModel[]>> {
  const response = useFetch<GetListResponse<FertilizerDeliveryModel[]>>(
    `/fertilizers/delivery?${params ?? ''}`,
  )

  return response
}
