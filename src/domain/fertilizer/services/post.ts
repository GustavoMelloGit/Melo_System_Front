import api from '../../../lib/config/api'
import { errorHandler } from '../../../lib/utils/error'
import { type PostServiceResponse } from '../../../shared/types/utils/service'
import {
  type FertilizerDeliveryFormValues,
  type FertilizerDeliveryModel,
} from '../types/model/Delivery'
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

export async function createFertilizerDeliveryService(
  values: FertilizerDeliveryFormValues,
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
