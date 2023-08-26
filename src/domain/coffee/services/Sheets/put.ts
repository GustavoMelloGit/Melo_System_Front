import api from '../../../../lib/config/api'
import { errorHandler } from '../../../../lib/utils/errorHandler'
import { type PutServiceResponse } from '../../../../shared/types/service/PutServiceResponse'
import { type SheetFormValues, type SheetModel } from '../../types/model/sheet'

export async function updateSheetService(
  bookNumber: string | number,
  sheetNumber: string | number,
  values: Partial<SheetFormValues>,
): PutServiceResponse<SheetModel> {
  try {
    const { data } = await api.put(`/sheets/${bookNumber}/${sheetNumber}`, values)

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
