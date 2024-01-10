import { type AuthContextType } from './context/auth'

export type SignInValues = {
  nickname: string
  password: string
}
export type SignInResponse = {
  token: string
  user: AuthContextType['user']
}
