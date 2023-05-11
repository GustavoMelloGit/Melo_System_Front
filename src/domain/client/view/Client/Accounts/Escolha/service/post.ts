import api from '../../../../../../../lib/config/api'
import { errorHandler } from '../../../../../../../lib/utils/error'
import { type PostServiceResponse } from '../../../../../../../shared/types/utils/service'
import { type EscolhaTransactionModel } from '../../../../../types/model/Transaction'
import { type CreateEscolhaValues } from '../types/esolha'

export async function createEscolhaService({
  clientId,
  ...values
}: CreateEscolhaValues): PostServiceResponse<EscolhaTransactionModel> {
  try {
    const { data } = await api.post(`/transactions/${clientId}`, {
      ...values,
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
