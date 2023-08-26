import api from '../../../lib/config/api'
import { errorHandler } from '../../../lib/utils/error'
import { type PostServiceResponse } from '../../../shared/types/service/PostServiceResponse'
import { type FertilizerDeliveryModel } from '../types/model/Delivery'
import { type FertilizerFormValues, type FertilizerModel } from '../types/model/Fertilizer'

export async function createFertilizerService(
  values: FertilizerFormValues,
): PostServiceResponse<FertilizerModel> {
  try {
    const { data } = await api.post('/fertilizers', values)

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
