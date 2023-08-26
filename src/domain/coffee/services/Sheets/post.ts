import api from '../../../../lib/config/api'
import { errorHandler } from '../../../../lib/utils/errorHandler'
import { type PostServiceResponse } from '../../../../shared/types/service/PostServiceResponse'
import { type SheetFormValues, type SheetModel } from '../../types/model/sheet'

export async function createSheetService(
  values: Omit<SheetFormValues, 'clientId'>,
  clientId: string,
  bookNumber: string | number,
): PostServiceResponse<SheetModel> {
  try {
    const { data } = await api.post(`/sheets/${bookNumber}/${clientId}`, {
      ...values,
      coffeeDetails: {
        ...values.coffeeDetails,
        ...(values.coffeeDetails.coffeeType === 'escolha'
          ? {
              bebida: undefined,
            }
          : {
              bebida: values.coffeeDetails.bebida,
            }),
      },
    })

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
