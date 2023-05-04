import api from '../../../../../../../lib/config/api'
import { errorHandler } from '../../../../../../../lib/utils/error'
import { type PostServiceResponse } from '../../../../../../../shared/types/utils/service'
import { type SacariaTransactionModel } from '../../../../../types/model/Transaction'
import { type SacariaFormValues } from '../types/sacaria'

export async function createSacariaService(
  values: SacariaFormValues,
  clientId: string,
): PostServiceResponse<SacariaTransactionModel> {
  try {
    const { data } = await api.post(`/transactions/${clientId}`, {
      ...values,
      type: 'bags',
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
