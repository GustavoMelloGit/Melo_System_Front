import { Box, Button, Center, Flex, Heading, VStack } from '@chakra-ui/react'
import AuthImage from '../../../../lib/assets/auth-image.jpg'
import RHFField from '../../../../shared/components/inputs/RHFField'
import RHFPasswordField from '../../../../shared/components/inputs/RHFPasswordField'
import { SignInValues } from '../../types'
import useSignInView from './useView'

export default function SignInView(): JSX.Element {
  const {
    form: { formState, register },
    handleSubmit,
  } = useSignInView()
  return (
    <Flex minW='100vw' minH='100vh' flexDir={['column', 'row']}>
      <Center flex={1}>
        <VStack spacing={6} px={8} align='stretch' w={['full', '400px']}>
          <VStack>
            <Heading as='h1' textAlign='center'>
              Melo System
            </Heading>
            <Heading as='h2' fontWeight={300} size='md' textAlign='center'>
              Por favor, faça login para continuar
            </Heading>
          </VStack>
          <form onSubmit={handleSubmit}>
            <VStack spacing={3}>
              <RHFField<SignInValues>
                register={register}
                name='email'
                label='Email'
                errors={formState.errors}
                type='email'
                autoComplete='email'
                placeholder='email@exemplo.com'
                variant='outline'
              />
              <RHFPasswordField<SignInValues>
                register={register}
                name='password'
                label='Senha'
                errors={formState.errors}
                autoComplete='current-password'
                placeholder='123456'
                variant='outline'
              />
              <Button isLoading={formState.isSubmitting} w='full' type='submit'>
                Login
              </Button>
            </VStack>
          </form>
        </VStack>
      </Center>
      <Box
        borderLeftRadius={[0, 50]}
        flex={1}
        bg={`url(${AuthImage})`}
        bgSize='cover'
        bgPosition='center'
      ></Box>
    </Flex>
  )
}
