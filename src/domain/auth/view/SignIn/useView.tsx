import useAuth from '../../hooks/useAuth'
import { type SignInInputDto } from '../../service'

export default function useSignInView(): SignInView {
  const { signIn } = useAuth()

  return {
    signIn,
  }
}

export type SignInView = {
  signIn: (values: SignInInputDto) => Promise<void>
}
