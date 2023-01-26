import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import validationErrors from '../../../../lib/errors/validation'
import useAuth from '../../hooks/useAuth'
import { type SignInValues } from '../../types'
import { type SignInView } from '../../types/view/SignIn/view'

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email(validationErrors.emailIsInvalid)
    .required(validationErrors.emailIsRequired),
  password: yup.string().required(validationErrors.passwordIsRequired),
})

export default function useSignInView(): SignInView {
  const form = useForm<SignInValues>({
    resolver: yupResolver(validationSchema),
  })
  const { signIn } = useAuth()
  const handleSubmit = form.handleSubmit(async (values: SignInValues): Promise<void> => {
    await signIn(values)
  })
  return {
    form,
    handleSubmit,
  }
}
