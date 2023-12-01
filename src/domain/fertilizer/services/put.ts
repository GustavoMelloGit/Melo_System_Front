import api from '../../../lib/config/api'
import { errorHandler } from '../../../lib/utils/errorHandler'
import { type PutServiceResponse } from '../../../shared/types/service/PutServiceResponse'
import { type ProductModel } from '../../product/types/Product'
import { FertilizerDeliveryStatuses, type FertilizerDeliveryModel } from '../types/model/Delivery'

export async function fertilizerDeliveryDoneService(
  id: string,
): PutServiceResponse<FertilizerDeliveryModel> {
  try {
    const { data } = await api.put(`/fertilizers/delivery/${id}`, {
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
    const { data } = await api.put(`/fertilizers/delivery/${id}`, {
      status: FertilizerDeliveryStatuses.PENDING,
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

export async function updateFertilizerService(
  id: string,
  value: Partial<ProductModel>,
): PutServiceResponse<ProductModel> {
  try {
    const { data } = await api.put(`/fertilizers/${id}`, value)

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

type UpdateFertilizerDeliveryServiceData = {
  clientName: string
  amount: number
  fertilizerId: string
  brook: string
  complement: string
  date: string
}
export async function updateFertilizerDeliveryService(
  id: string,
  values: UpdateFertilizerDeliveryServiceData,
): PutServiceResponse<FertilizerDeliveryModel> {
  try {
    const { data } = await api.put(`/fertilizers/delivery/${id}`, values)

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
