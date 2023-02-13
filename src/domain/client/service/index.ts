import api from '../../../lib/config/api'
import { uploadImage } from '../../../lib/service/upload'
import { errorHandler } from '../../../lib/utils/error'
import useFetch from '../../../shared/hooks/useFetch'
import {
  type GetServiceResponse,
  type PostServiceResponse,
  type PutServiceResponse,
} from '../../../shared/types/utils/service'
import { type ClientFormValues } from '../types/components/ClientsForm'
import { type ClientModel } from '../types/model/Client'
import { type TransactionModel } from '../types/model/Transaction'
import { type CheckingAccountFormValues } from '../types/view/Details'

export function listClientsService(params?: string): GetServiceResponse<ClientModel[]> {
  const { data, error, isLoading } = useFetch(`/clients?${params ?? ''}`)

  return {
    data: data?.data,
    error: errorHandler(error),
    isLoading,
    total: data?.total ?? 0,
  }
}

export function getClientService(id: string): GetServiceResponse<ClientModel> {
  const { data, error, isLoading, mutate } = useFetch(`/clients/${id}`)

  return {
    data,
    error: errorHandler(error),
    isLoading,
    mutate,
  }
}

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

export async function updateClientService(
  id: string,
  values: ClientFormValues,
): Promise<PutServiceResponse<ClientModel>> {
  try {
    let profileImage = values.profileImage
    const profileImageIsBase64 = profileImage?.includes('data:image')
    if (profileImage && profileImageIsBase64) {
      profileImage = await uploadImage(profileImage, values.name)
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

export async function createTransactionService(
  values: CheckingAccountFormValues,
  clientId: string,
): Promise<PostServiceResponse<TransactionModel>> {
  try {
    const { data } = await api.post(`/transactions/${clientId}`, {
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

export function getTransactionsService(
  clientId: string,
  params?: string,
): GetServiceResponse<TransactionModel[]> {
  const { data, error, isLoading, mutate } = useFetch(`/transactions/${clientId}?${params ?? ''}`)

  return {
    data: data?.data ?? [],
    error: errorHandler(error),
    isLoading,
    total: data?.total ?? 0,
    mutate,
  }
}
