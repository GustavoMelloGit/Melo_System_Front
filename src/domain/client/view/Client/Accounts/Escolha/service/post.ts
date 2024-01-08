import api from '../../../../../../../lib/config/api'
import { errorHandler } from '../../../../../../../lib/utils/errorHandler'
import { type PostServiceResponse } from '../../../../../../../shared/types/service/PostServiceResponse'
import { type EscolhaTransactionModel } from '../../../../../types/model/Transaction'
import { type CreateEscolhaValues } from '../types/esolha'

export async function createEscolhaService({
  clientId,
  ...values
}: CreateEscolhaValues): PostServiceResponse<EscolhaTransactionModel> {
  try {
    const { data } = await api.post(`/transactions/${clientId}`, {
      ...values,
      details: {
        ...values.details,
        coffeeType: 'escolha',
      },
      type: 'escolha',
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

type BuyEscolhaServiceValues = {
  clientId: string
  coffeeType: 'escolha'
  pricePerWeight: number
  weight: number
  value: number
  description?: string
  brook?: string
  complement?: string
}
export async function buyEscolhaService({
  clientId,
  ...values
}: BuyEscolhaServiceValues): PostServiceResponse<void> {
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
