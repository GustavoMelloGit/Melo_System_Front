import { type UserModel } from '../types/user'

export type SignInInputDto = {
  nickname: string
  password: string
}
export type SignInOutputDto = {
  token: string
  user: UserModel
}
