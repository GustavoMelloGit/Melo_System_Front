import api from '../../../lib/config/api'
import { uploadImage } from '../../../lib/service/upload'
import { errorHandler } from '../../../lib/utils/errorHandler'
import { type DeleteServiceResponse } from '../../../shared/types/service/DeleteServiceResponse'
import { type GetServiceResponse } from '../../../shared/types/service/GetServiceResponse'
import { type PostServiceResponse } from '../../../shared/types/service/PostServiceResponse'
import { type PutServiceResponse } from '../../../shared/types/service/PutServiceResponse'
import { type ClientFormValues } from '../components/Client/Form/types'
import { type CheckingAccountFormValues } from '../types/model/CheckingAccount'
import { type ClientModel } from '../types/model/Client'
import { type CurrencyTransactionModel } from '../types/model/Transaction'
import {
  type ClientAccount,
  type ResponseByClientAccount,
  type TransferBetweenClientsServiceData,
} from './ClientService.dto'

export class ClientService {
  static async deleteClient(clientId: string): DeleteServiceResponse {
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

  static async getTransactionsFromClient<T extends ClientAccount>(
    type: T,
    clientId: string,
    params?: string,
  ): GetServiceResponse<Array<ResponseByClientAccount<T>>> {
    try {
      const defaultParams = new URLSearchParams({
        clientId,
        type,
      }).toString()
      const response = await api.get(
        `/metrics/findAllTransactionsFromClient?${defaultParams}${params ? `&${params}` : ''}`,
      )
      return {
        data: response.data,
        error: null,
      }
    } catch (e) {
      return {
        data: null,
        error: errorHandler(e),
      }
    }
  }

  static async createClient(values: ClientFormValues): PostServiceResponse<ClientModel> {
    try {
      let profileImage = values.profileImage
      const profileImageIsBase64 = profileImage?.includes('data:image')
      if (profileImage && profileImageIsBase64) {
        profileImage = await uploadImage(
          profileImage,
          `${values.name}-${Math.floor(Math.random() * 10_000)}`,
        )
      }

      const { data } = await api.post('/clients', {
        ...values,
        profileImage,
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

  static async createCurrencyTransaction(
    values: CheckingAccountFormValues,
    clientId: string,
  ): PostServiceResponse<CurrencyTransactionModel> {
    try {
      const { data } = await api.post(`/transactions/${clientId}`, {
        ...values,
        value: Number(values.value),
        type: 'currency',
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

  static async transferBetweenClients(
    values: TransferBetweenClientsServiceData,
  ): PostServiceResponse<CurrencyTransactionModel> {
    try {
      const { data } = await api.post(`/transfer`, values)

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

  static async updateClient(id: string, values: ClientFormValues): PutServiceResponse<ClientModel> {
    try {
      let profileImage = values.profileImage
      const profileImageIsBase64 = profileImage?.includes('data:image')
      if (profileImage && profileImageIsBase64) {
        profileImage = await uploadImage(profileImage, `${values.name}-${id}`)
      }
      const { data } = await api.put(`/clients/${id}`, {
        ...values,
        profileImage,
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
}
