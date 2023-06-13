import api from '../../../../../../../lib/config/api'
import { errorHandler } from '../../../../../../../lib/utils/error'
import { type PostServiceResponse } from '../../../../../../../shared/types/utils/service'
import { type SellFertilizerFormValues } from '../components/Sell/types'

export async function sellFertilizerService(
  clientId: string,
  values: SellFertilizerFormValues,
): PostServiceResponse<void> {
  try {
    const { data } = await api.post(`/fertilizer/sell/${clientId}`, values)
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
