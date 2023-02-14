import useAuth from '../../hooks/useAuth'
import { type SignInView } from '../../types/view/SignIn/view'

export default function useSignInView(): SignInView {
  const { signIn } = useAuth()

  return {
    signIn,
  }
}
