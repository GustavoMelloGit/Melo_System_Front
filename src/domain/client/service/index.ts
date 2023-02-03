import api from '../../../lib/config/api'
import { uploadImage } from '../../../lib/service/upload'
import { errorHandler } from '../../../lib/utils/error'
import useFetch from '../../../shared/hooks/useFetch'
import {
  type GetServiceResponse,
  type PostServiceResponse,
} from '../../../shared/types/utils/service'
import { type ClientFormValues } from '../types/components/ClientsForm'
import { type ClientModel } from '../types/model/Client'

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
  const { data, error, isLoading } = useFetch(`/clients/${id}`)

  return {
    data,
    error: errorHandler(error),
    isLoading,
  }
}

export async function createClientService(
  values: ClientFormValues,
): Promise<PostServiceResponse<any>> {
  try {
    let profileImage = values.profileImage
    if (profileImage) {
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
