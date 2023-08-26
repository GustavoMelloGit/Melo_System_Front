import api from '../../../lib/config/api'
import { uploadImage } from '../../../lib/service/upload'
import { errorHandler } from '../../../lib/utils/errorHandler'
import { type PutServiceResponse } from '../../../shared/types/service/PutServiceResponse'
import { type ClientFormValues } from '../components/Client/Form/types'
import { type ClientModel } from '../types/model/Client'

export async function updateClientService(
  id: string,
  values: ClientFormValues,
): PutServiceResponse<ClientModel> {
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
