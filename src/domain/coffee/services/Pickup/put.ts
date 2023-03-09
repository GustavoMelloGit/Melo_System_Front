import api from '../../../../lib/config/api'
import { errorHandler } from '../../../../lib/utils/error'
import { type PutServiceResponse } from '../../../../shared/types/utils/service'
import { type PickupCoffee, type PickupFormValues } from '../../types/model/pickup'

export async function updatePickupService(
  id: string,
  values: PickupFormValues,
): Promise<PutServiceResponse<PickupCoffee>> {
  try {
    const { data } = await api.put(`/orders/${id}`, {
      ...values,
      bags: Number(values.bags),
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
