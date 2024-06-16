import { Button, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { validationErrors } from '../../../../lib/errors'
import ControllerField from '../../../../shared/components/inputs/ControllerField'
import RHFPasswordField from '../../../../shared/components/inputs/RHFPasswordField'

const validationSchema = yup.object().shape({
  nickname: yup.string().required(validationErrors.nicknameIsRequired),
  password: yup.string().required(validationErrors.passwordIsRequired),
})

type SignInFormValues = {
  nickname: string
  password: string
}

export type SignInFormProps = {
  onSubmit: (values: SignInFormValues) => Promise<void>
}

export default function SignInForm({ onSubmit }: SignInFormProps): JSX.Element {
  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    register,
    control,
  } = useForm<SignInFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      nickname: '',
      password: '',
    },
  })

  async function submitHandler(values: SignInFormValues): Promise<void> {
    await onSubmit(values)
  }
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <VStack spacing={3}>
        <ControllerField
          name='nickname'
          control={control}
          label='Usuário'
          autoComplete='username'
          placeholder='admin'
          variant='outline'
          data-cy='nickname-input'
        />
        <RHFPasswordField
          register={register}
          name='password'
          label='Senha'
          errors={errors}
          autoComplete='current-password'
          placeholder='123456'
          variant='outline'
          data-cy='password-input'
        />
        <Button isLoading={isSubmitting} w='full' type='submit' data-cy='submit' colorScheme='blue'>
          Login
        </Button>
      </VStack>
    </form>
  )
}
