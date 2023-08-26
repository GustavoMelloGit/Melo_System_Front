import api from '../../../../lib/config/api'
import { errorHandler } from '../../../../lib/utils/errorHandler'
import { type DeleteServiceResponse } from '../../../../shared/types/service/DeleteServiceResponse'

export async function deleteSheetService(
  identifier: string | number,
  bookNumber: string | number,
): DeleteServiceResponse {
  try {
    await api.delete(`/sheets/${bookNumber}/${identifier}`)

    return {
      error: null,
    }
  } catch (e) {
    return {
      error: errorHandler(e),
    }
  }
}
