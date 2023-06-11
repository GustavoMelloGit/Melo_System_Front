import api from '../../../lib/config/api'
import { errorHandler } from '../../../lib/utils/error'
import { type PutServiceResponse } from '../../../shared/types/utils/service'
import {
  FertilizerDeliveryStatuses,
  type FertilizerDeliveryFormValues,
  type FertilizerDeliveryModel,
} from '../types/model/Delivery'

export async function fertilizerDeliveryDoneService(
  id: string,
): PutServiceResponse<FertilizerDeliveryModel> {
  try {
    const { data } = await api.put(`/orders/${id}`, {
      status: FertilizerDeliveryStatuses.COMPLETED,
    })

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

export async function fertilizerDeliveryCancelService(
  id: string,
): PutServiceResponse<FertilizerDeliveryModel> {
  try {
    const { data } = await api.put(`/orders/${id}`, {
      status: FertilizerDeliveryStatuses.CANCELLED,
    })

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

export async function updateFertilizerDeliveryService(
  values: FertilizerDeliveryFormValues,
): PutServiceResponse<FertilizerDeliveryModel> {
  try {
    const { data } = await api.put('/fertilizers/delivery', values)

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
