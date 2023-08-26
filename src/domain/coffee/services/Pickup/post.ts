import api from '../../../../lib/config/api'
import { errorHandler } from '../../../../lib/utils/errorHandler'
import { type PostServiceResponse } from '../../../../shared/types/service/PostServiceResponse'
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
