import api from '../../../lib/config/api'
import { errorHandler } from '../../../lib/utils/error'
import { type DeleteServiceResponse } from '../../../shared/types/service/DeleteServiceResponse'

export async function deleteClientService(clientId: string): DeleteServiceResponse {
  try {
    await api.delete(`/clients/${clientId}`)
    return {
      error: null,
    }
  } catch (e) {
    return {
      error: errorHandler(e),
    }
  }
}
