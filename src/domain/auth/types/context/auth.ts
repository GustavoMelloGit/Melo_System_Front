import { type SignInValues } from '..'
import { type UserModel } from '../model/user'

export type AuthContextType = {
  user: UserModel
  signIn: AuthSignIn
  signOut: AuthSignOut
  appInitialized: boolean
}

export type AuthSignIn = (values: SignInValues) => Promise<void>
export type AuthSignOut = () => void
