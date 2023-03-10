import api from '../../../../lib/config/api'
import { errorHandler } from '../../../../lib/utils/error'
import { type PostServiceResponse } from '../../../../shared/types/utils/service'
import { type PickupCoffeeModel, type PickupFormValues } from '../../types/model/pickup'

export async function createPickupService(
  values: PickupFormValues,
): PostServiceResponse<PickupCoffeeModel> {
  try {
    const { data } = await api.post('/orders', values)

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
