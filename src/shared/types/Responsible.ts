import { type UserModel } from '../../domain/auth/types/user'

export type Responsible = {
  userId: string
  user?: UserModel
}
