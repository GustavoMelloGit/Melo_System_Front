import api from '../../../../../../../lib/config/api'
import { errorHandler } from '../../../../../../../lib/utils/error'
import { type PostServiceResponse } from '../../../../../../../shared/types/utils/service'
import { type CoffeeBebidas, type CoffeeTypes } from '../../../../../../coffee/types/model/coffee'
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

type BuyCoffeeServiceValues = {
  clientId: string
  bebida: CoffeeBebidas
  coffeeType: CoffeeTypes
  weight: number
  value: number
  address?: string
}
export async function buyCoffeeService({
  clientId,
  ...values
}: BuyCoffeeServiceValues): PostServiceResponse<void> {
  try {
    const { data } = await api.post(`/clients/${clientId}/buy`, values)
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
