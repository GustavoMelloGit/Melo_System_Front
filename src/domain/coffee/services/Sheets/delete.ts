import api from '../../../../lib/config/api'
import { errorHandler } from '../../../../lib/utils/error'
import { type DeleteServiceResponse } from '../../../../shared/types/utils/service'

export async function deleteSheetService(sheetId: string | number): DeleteServiceResponse {
  try {
    await api.delete(`/sheets/${sheetId}`)

    return {
      error: null,
    }
  } catch (e) {
    return {
      error: errorHandler(e),
    }
  }
}
