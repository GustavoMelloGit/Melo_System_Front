import api from '../../../lib/config/api'
import { errorHandler } from '../../../lib/utils/errorHandler'
import { type PostServiceResponse } from '../../../shared/types/service/PostServiceResponse'
import { type StockProductFormValues } from '../components/Stock/Form/types'
import { type ProductModel } from '../types/Product'

export async function updateStockProductService(
  id: string,
  values: StockProductFormValues,
): PostServiceResponse<ProductModel> {
  try {
    const { data } = await api.put(`/fertilizers/${id}`, values)

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
