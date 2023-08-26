import api from '../../../../lib/config/api'
import { errorHandler } from '../../../../lib/utils/errorHandler'
import useFetch from '../../../../shared/hooks/useFetch'
import { type GetListResponse } from '../../../../shared/types/service/GetListResponse'
import { type SWRServiceResponse } from '../../../../shared/types/service/SWRServiceResponse'
import { type PickupCoffeeModel } from '../../types/model/pickup'

export function getPickupOrdersService(
  params?: string,
): SWRServiceResponse<GetListResponse<PickupCoffeeModel[]>> {
  const response = useFetch<GetListResponse<PickupCoffeeModel[]>>(`/orders?${params ?? ''}`)

  return response
}

export async function getPDFPickupOrdersService(): Promise<PickupCoffeeModel[]> {
  try {
    const response = await api.get<PickupCoffeeModel[]>('/orders?status=inProgress')
    return response.data
  } catch (e) {
    throw new Error(errorHandler(e))
  }
}
