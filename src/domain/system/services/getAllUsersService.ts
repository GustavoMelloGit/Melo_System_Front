import useFetch from '../../../shared/hooks/useFetch'
import { type SWRServiceResponse } from '../../../shared/types/service/SWRServiceResponse'
import { type UserModel } from '../../auth/types/model/user'

export default function getAllUsersService(): SWRServiceResponse<UserModel[]> {
  const response = useFetch('/users')
  return response
}
