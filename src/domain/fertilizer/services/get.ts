import api from '../../../lib/config/api'
import { errorHandler } from '../../../lib/utils/errorHandler'
import useFetch, { type FetchConfig } from '../../../shared/hooks/useFetch'
import { type GetListResponse } from '../../../shared/types/service/GetListResponse'
import { type GetServiceResponse } from '../../../shared/types/service/GetServiceResponse'
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

export async function getFertilizerByNameService(
  name: string,
): GetServiceResponse<FertilizerModel> {
  try {
    const response = await api.get<GetListResponse<FertilizerModel[]>>(`/fertilizers?name=${name}`)
    const sameNameFertilizers = response.data.data.filter((fertilizer) => fertilizer.name === name)
    return {
      data: sameNameFertilizers[0],
      error: null,
    }
  } catch (e) {
    return {
      data: null,
      error: errorHandler(e),
    }
  }
}

export function useGetFertilizersDeliveryService(
  params?: string,
): SWRServiceResponse<GetListResponse<FertilizerDeliveryModel[]>> {
  const response = useFetch<GetListResponse<FertilizerDeliveryModel[]>>(
    `/fertilizers/delivery?${params ?? ''}`,
  )

  return response
}
