import api from '../../../lib/config/api'
import { errorHandler } from '../../../lib/utils/errorHandler'
import { type DeleteServiceResponse } from '../../../shared/types/service/DeleteServiceResponse'

export async function deleteUserService(id: string): DeleteServiceResponse {
  try {
    await api.delete(`/users/${id}`)

    return {
      error: null,
    }
  } catch (e) {
    return {
      error: errorHandler(e),
    }
  }
}
