import api from '../../../../lib/config/api'
import { errorHandler } from '../../../../lib/utils/error'
import { type PutServiceResponse } from '../../../../shared/types/utils/service'
import {
  PickupCoffeeStatuses,
  type PickupCoffeeModel,
  type PickupFormValues,
} from '../../types/model/pickup'

export async function updatePickupService(
  id: string,
  values: Partial<PickupFormValues>,
): Promise<PutServiceResponse<PickupCoffeeModel>> {
  try {
    const { data } = await api.put(`/orders/${id}`, values)

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

export async function pickupCoffeeDoneService(
  id: string,
): Promise<PutServiceResponse<PickupCoffeeModel>> {
  try {
    const { data } = await api.put(`/orders/${id}`, {
      status: PickupCoffeeStatuses.COMPLETED,
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

export async function pickupCoffeePendingService(
  id: string,
): Promise<PutServiceResponse<PickupCoffeeModel>> {
  try {
    const { data } = await api.put(`/orders/${id}`, {
      status: PickupCoffeeStatuses.PENDING,
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
