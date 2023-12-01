import { type SWRConfiguration } from 'swr'
import api from '../../../lib/config/api'
import { errorHandler } from '../../../lib/utils/errorHandler'
import useFetch from '../../../shared/hooks/useFetch'
import { type GetListResponse } from '../../../shared/types/service/GetListResponse'
import { type GetServiceResponse } from '../../../shared/types/service/GetServiceResponse'
import { type SWRServiceResponse } from '../../../shared/types/service/SWRServiceResponse'
import { type ProductModel } from '../../product/types/Product'
import { type FertilizerDeliveryModel } from '../types/model/Delivery'

export function getFertilizersService(
  params?: string,
  config?: SWRConfiguration,
): SWRServiceResponse<GetListResponse<ProductModel[]>> {
  const response = useFetch<GetListResponse<ProductModel[]>>(`/fertilizers?${params ?? ''}`, config)

  return response
}

export async function getFertilizerByNameService(name: string): GetServiceResponse<ProductModel> {
  try {
    const response = await api.get<GetListResponse<ProductModel[]>>(`/fertilizers?name=${name}`)
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

export function getFertilizersDeliveryService(
  params?: string,
): SWRServiceResponse<GetListResponse<FertilizerDeliveryModel[]>> {
  const response = useFetch<GetListResponse<FertilizerDeliveryModel[]>>(
    `/fertilizers/delivery?${params ?? ''}`,
  )

  return response
}
