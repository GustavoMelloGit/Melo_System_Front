import api from '../../../../../../../lib/config/api'
import { errorHandler } from '../../../../../../../lib/utils/error'
import { type PostServiceResponse } from '../../../../../../../shared/types/utils/service'
import { type CoffeeTransactionModel } from '../../../../../types/model/Transaction'
import { type CreateCoffeeValues } from '../types'

export async function createCoffeeService({
  clientId,
  details,
  ...values
}: CreateCoffeeValues): PostServiceResponse<CoffeeTransactionModel> {
  try {
    const { data } = await api.post(`/transactions/${clientId}`, {
      ...values,
      details,
      type: details.bebida,
    })
    return {
      data,
      error: null,
    }
  } catch (e) {
    return {
      data: null,
      error: errorHandler(e),
    }
  }
}
