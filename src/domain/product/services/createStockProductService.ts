import api from '../../../lib/config/api'
import { errorHandler } from '../../../lib/utils/errorHandler'
import { type PostServiceResponse } from '../../../shared/types/service/PostServiceResponse'
import { type FertilizerModel } from '../../fertilizer/types/model/Fertilizer'
import { type StockProductFormValues } from '../components/Stock/Form/types'

export async function createStockProductService(
  values: StockProductFormValues,
): PostServiceResponse<FertilizerModel> {
  try {
    const { data } = await api.post('/fertilizers', values)

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
