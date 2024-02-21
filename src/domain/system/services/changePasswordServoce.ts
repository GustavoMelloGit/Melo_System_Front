import api from '../../../lib/config/api'
import { errorHandler } from '../../../lib/utils/errorHandler'
import { type PutServiceResponse } from '../../../shared/types/service/PutServiceResponse'

type ChangePasswordData = {
  password: string
  id: string
}

export async function changePasswordService(data: ChangePasswordData): PutServiceResponse<null> {
  try {
    await api.put(`/users/change-password/${data.id}`, data)

    return {
      data: null,
      error: null,
    }
  } catch (e) {
    return {
      data: null,
      error: errorHandler(e),
    }
  }
}
