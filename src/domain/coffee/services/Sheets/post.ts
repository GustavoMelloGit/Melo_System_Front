import api from '../../../../lib/config/api'
import { errorHandler } from '../../../../lib/utils/error'
import { type PostServiceResponse } from '../../../../shared/types/utils/service'
import { type SheetFormValues, type SheetModel } from '../../types/model/sheet'

export async function createSheetService(
  values: Omit<SheetFormValues, 'clientId'>,
  clientId: string,
  bookNumber: string | number,
): PostServiceResponse<SheetModel> {
  try {
    const { data } = await api.post(`/sheets/${bookNumber}/${clientId}`, values)

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
