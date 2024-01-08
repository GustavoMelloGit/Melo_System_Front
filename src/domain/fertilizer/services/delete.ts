import api from '../../../lib/config/api'
import { errorHandler } from '../../../lib/utils/errorHandler'
import { type DeleteServiceResponse } from '../../../shared/types/service/DeleteServiceResponse'

export async function deleteFertilizerService(id: string): DeleteServiceResponse {
  try {
    await api.delete(`/fertilizers/${id}`)
    return {
      error: null,
    }
  } catch (err) {
    return {
      error: errorHandler(err),
    }
  }
}
