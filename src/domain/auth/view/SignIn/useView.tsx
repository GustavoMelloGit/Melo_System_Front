import useAuth from '../../hooks/useAuth'
import { type AuthSignIn } from '../../types/context/auth'

export default function useSignInView(): SignInView {
  const { signIn } = useAuth()

  return {
    signIn,
  }
}

export type SignInView = {
  signIn: AuthSignIn
}
