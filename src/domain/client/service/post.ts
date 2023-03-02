import api from '../../../lib/config/api'
import { uploadImage } from '../../../lib/service/upload'
import { errorHandler } from '../../../lib/utils/error'
import { type PostServiceResponse } from '../../../shared/types/utils/service'
import { type ClientFormValues } from '../types/components/ClientsForm'
import { type ClientModel } from '../types/model/Client'
import { type TransactionModel } from '../types/model/Transaction'
import { type CheckingAccountFormValues } from '../types/view/Details'

export async function createClientService(
  values: ClientFormValues,
): Promise<PostServiceResponse<ClientModel>> {
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
): Promise<PostServiceResponse<TransactionModel>> {
  try {
    const { data } = await api.post(`/transactions/currency/${clientId}`, {
      ...values,
      value: Number(values.value),
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
