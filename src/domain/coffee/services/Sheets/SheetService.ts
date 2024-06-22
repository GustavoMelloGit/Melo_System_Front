import api from '../../../../lib/config/api'
import { errorHandler } from '../../../../lib/utils/errorHandler'
import { DeleteServiceResponse } from '../../../../shared/types/service/DeleteServiceResponse'
import { PostServiceResponse } from '../../../../shared/types/service/PostServiceResponse'
import { PutServiceResponse } from '../../../../shared/types/service/PutServiceResponse'
import { SheetFormValues, SheetModel } from '../../types/model/sheet'

export class SheetService {
  static async create(
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
  static async update(
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
  static async delete(
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
}
