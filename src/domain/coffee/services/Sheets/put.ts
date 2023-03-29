import api from '../../../../lib/config/api'
import { errorHandler } from '../../../../lib/utils/error'
import { type PutServiceResponse } from '../../../../shared/types/utils/service'
import { type SheetFormValues, type SheetModel } from '../../types/model/sheet'

export async function updateSheetService(
  sheetNumber: string | number,
  values: SheetFormValues,
): PutServiceResponse<SheetModel> {
  try {
    const { data } = await api.put(`/sheets/${sheetNumber}`, values)

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
