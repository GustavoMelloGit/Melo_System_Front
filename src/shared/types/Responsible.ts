import { type UserModel } from '../../domain/auth/types/model/user'

export type Responsible = {
  userId: string
  user?: UserModel
}
