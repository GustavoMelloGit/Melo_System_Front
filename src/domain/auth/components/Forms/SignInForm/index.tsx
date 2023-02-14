import { Button, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { validationErrors } from '../../../../../lib/errors'
import RHFField from '../../../../../shared/components/inputs/RHFField'
import RHFPasswordField from '../../../../../shared/components/inputs/RHFPasswordField'
import { type SignInValues } from '../../../types'

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email(validationErrors.emailIsInvalid)
    .required(validationErrors.emailIsRequired),
  password: yup.string().required(validationErrors.passwordIsRequired),
})

export type SignInFormProps = {
  onSubmit: (values: SignInValues) => Promise<void>
}
export default function SignInForm({ onSubmit }: SignInFormProps): JSX.Element {
  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    register,
  } = useForm<SignInValues>({
    resolver: yupResolver(validationSchema),
  })

  async function submitHandler(values: SignInValues): Promise<void> {
    await onSubmit(values)
  }
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <VStack spacing={3}>
        <RHFField<SignInValues>
          register={register}
          name='email'
          label='Email'
          errors={errors}
          type='email'
          autoComplete='email'
          placeholder='email@exemplo.com'
          variant='outline'
        />
        <RHFPasswordField<SignInValues>
          register={register}
          name='password'
          label='Senha'
          errors={errors}
          autoComplete='current-password'
          placeholder='123456'
          variant='outline'
        />
        <Button isLoading={isSubmitting} w='full' type='submit'>
          Login
        </Button>
      </VStack>
    </form>
  )
}
