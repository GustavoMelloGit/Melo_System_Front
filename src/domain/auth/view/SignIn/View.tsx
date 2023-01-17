import { Button, Card, CardBody, CardHeader, Center, Heading, VStack } from '@chakra-ui/react'
import RHFField from '../../../../lib/components/inputs/RHFField'
import RHFPasswordField from '../../../../lib/components/inputs/RHFPasswordField'
import { SignInValues } from '../../types'
import useSignInView from './useView'

export default function SigninView(): JSX.Element {
  const {
    form: { formState, register },
    handleSubmit,
  } = useSignInView()
  return (
    <Center flex={1}>
      <Card p={6}>
        <CardHeader>
          <Heading as='h1'>Login</Heading>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing={6}>
              <RHFField<SignInValues>
                register={register}
                name='email'
                label='Email'
                errors={formState.errors}
                type='email'
                autoComplete='email'
              />
              <RHFPasswordField<SignInValues>
                register={register}
                name='password'
                label='Senha'
                errors={formState.errors}
                autoComplete='current-password'
              />
              <Button isLoading={formState.isSubmitting} w='full' type='submit'>
                Login
              </Button>
            </VStack>
          </form>
        </CardBody>
      </Card>
    </Center>
  )
}
