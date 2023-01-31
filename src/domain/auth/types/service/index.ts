import { type PostServiceResponse } from '../../../../shared/types/utils/service'
import { type AuthContextType } from '../context/auth'

export type SignInResponse = PostServiceResponse<{
  token: string
  user: AuthContextType['user']
}>
