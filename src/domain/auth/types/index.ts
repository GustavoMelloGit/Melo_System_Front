import { type PostServiceResponse } from '../../../shared/types/service/PostServiceResponse'
import { type AuthContextType } from './context/auth'

export type SignInValues = {
  nickname: string
  password: string
}
export type SignInResponse = PostServiceResponse<{
  token: string
  user: AuthContextType['user']
}>
