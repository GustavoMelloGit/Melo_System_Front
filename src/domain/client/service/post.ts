import api from '../../../lib/config/api'
import { uploadImage } from '../../../lib/service/upload'
import { errorHandler } from '../../../lib/utils/error'
import { type PostServiceResponse } from '../../../shared/types/utils/service'
import { type CoffeeBebidas, type CoffeeDetails } from '../../coffee/types/model/coffee'
import { type ClientFormValues } from '../components/Client/Form/types'
import { type CheckingAccountFormValues } from '../types/model/CheckingAccount'
import { type ClientModel } from '../types/model/Client'
import { type CurrencyTransactionModel } from '../types/model/Transaction'

export async function createClientService(
  values: ClientFormValues,
): PostServiceResponse<ClientModel> {
  try {
    let profileImage = values.profileImage
    const profileImageIsBase64 = profileImage?.includes('data:image')
    if (profileImage && profileImageIsBase64) {
      profileImage = await uploadImage(profileImage, values.name)
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

export async function createTransactionService(
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

export type TransferBetweenClientsReferralData = {
  clientId: string
  item: {
    type: 'currency' | CoffeeBebidas
    value: number
    details?: Partial<CoffeeDetails>
  }
}
export type TransferBetweenClientsServiceData = {
  from: TransferBetweenClientsReferralData
  to: TransferBetweenClientsReferralData
  description: string
}
export async function transferBetweenClientsService(
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
