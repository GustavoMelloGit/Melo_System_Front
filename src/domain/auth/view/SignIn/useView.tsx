import { useForm } from 'react-hook-form'
import useAuth from '../../hooks/useAuth'
import { SignInValues } from '../../types'
import { SignInView } from '../../types/view/SignIn/view'

export default function useSignInView(): SignInView {
  const form = useForm<SignInValues>()
  const { signIn } = useAuth()
  const handleSubmit = form.handleSubmit(async (values: SignInValues): Promise<void> => {
    await signIn(values)
  })
  return {
    form,
    handleSubmit,
  }
}
