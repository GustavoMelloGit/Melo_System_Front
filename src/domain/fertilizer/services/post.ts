import api from '../../../lib/config/api'
import { errorHandler } from '../../../lib/utils/errorHandler'
import { type PostServiceResponse } from '../../../shared/types/service/PostServiceResponse'
import { type FertilizerDeliveryModel } from '../types/model/Delivery'

export type CreateFertilizerDeliveryServiceData = {
  clientId: string
  amount: number
  fertilizerId: string
  brook: string
  complement: string
  date: string
}

export async function createFertilizerDeliveryService(
  values: CreateFertilizerDeliveryServiceData,
): PostServiceResponse<FertilizerDeliveryModel> {
  try {
    const { data } = await api.post('/fertilizers/delivery', values)

    return {
      data,
      error: null,
    }
  } catch (e) {
    return {
      error: errorHandler(e),
      data: null,
    }
  }
}
