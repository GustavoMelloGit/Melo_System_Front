import api from '../../../../../../../lib/config/api'
import { errorHandler } from '../../../../../../../lib/utils/error'
import { type PostServiceResponse } from '../../../../../../../shared/types/service/PostServiceResponse'

type SellFertilizerServiceValues = {
  clientId: string
  fertilizerId: string
  bags: number
  pricePerBag: number
  brook?: string
  complement?: string
}
export async function sellFertilizerService({
  clientId,
  ...values
}: SellFertilizerServiceValues): PostServiceResponse<void> {
  try {
    const { data } = await api.post(`/fertilizers/sell/${clientId}`, values)
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
