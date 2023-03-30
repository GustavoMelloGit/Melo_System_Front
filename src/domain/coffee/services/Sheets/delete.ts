import api from '../../../../lib/config/api'
import { errorHandler } from '../../../../lib/utils/error'
import { type DeleteServiceResponse } from '../../../../shared/types/utils/service'

export async function deleteSheetService(identifier: string | number): DeleteServiceResponse {
  try {
    await api.delete(`/sheets/${identifier}`)

    return {
      error: null,
    }
  } catch (e) {
    return {
      error: errorHandler(e),
    }
  }
}
